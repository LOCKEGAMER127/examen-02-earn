import { BadRequestException, ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { Rol } from '../roles/entities/role.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  // ── Helpers ──────────────────────────────────────────────

  private omitPassword(usuario: Usuario) {
    const { password: _, ...resto } = usuario;
    return resto;
  }

  private async findRol(nombre: string): Promise<Rol> {
    const rol = await this.rolRepository.findOne({ where: { nombre } });
    if (!rol) throw new BadRequestException(`Rol ${nombre} no encontrado`);
    return rol;
  }

  // ── POST /users — Solo DEVELOPER ─────────────────────────

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { nombre, username, password } = createUsuarioDto;

    const existe = await this.usuarioRepository.findOne({ where: { username } });
    if (existe) throw new BadRequestException('El username ya está en uso');

    const rol = await this.findRol('USER');
    const hash = await bcrypt.hash(password, 10);

    const usuario = this.usuarioRepository.create({ nombre, username, password: hash, rol });
    const guardado = await this.usuarioRepository.save(usuario);

    return this.omitPassword(guardado);
  }

  // ── GET /users — ADMIN/DEVELOPER: todos | USER: solo el suyo ──

  async findAll(usuarioActual: Usuario) {
    const rolNombre = usuarioActual.rol.nombre;

    if (rolNombre === 'ADMIN' || rolNombre === 'DEVELOPER') {
      const usuarios = await this.usuarioRepository.find();
      return usuarios.map(this.omitPassword);
    }

    // USER — solo su propio perfil
    return this.omitPassword(usuarioActual);
  }

  // ── GET /users/:id — uso interno del servicio ─────────────

  async findOne(id: number, usuarioActual: Usuario) {
    const rolNombre = usuarioActual.rol.nombre;

    // USER solo puede ver su propio perfil
    if (rolNombre === 'USER' && usuarioActual.id !== id) {
      throw new ForbiddenException('Solo puedes consultar tu propio perfil');
    }

    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException(`Usuario #${id} no encontrado`);

    return this.omitPassword(usuario);
  }

  // ── PATCH /users/:id — Solo DEVELOPER ────────────────────

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException(`Usuario #${id} no encontrado`);

    // Si viene password nueva, encriptarla
    if (updateUsuarioDto.password) {
      updateUsuarioDto.password = await bcrypt.hash(updateUsuarioDto.password, 10);
    }

    // Si viene nuevo username, verificar que no exista
    if (updateUsuarioDto.username && updateUsuarioDto.username !== usuario.username) {
      const existe = await this.usuarioRepository.findOne({
        where: { username: updateUsuarioDto.username },
      });
      if (existe) throw new BadRequestException('El username ya está en uso');
    }

    Object.assign(usuario, updateUsuarioDto);
    const actualizado = await this.usuarioRepository.save(usuario);

    return this.omitPassword(actualizado);
  }

  // ── DELETE /users/:id — Solo ADMIN (soft delete) ─────────

  async remove(id: number) {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException(`Usuario #${id} no encontrado`);

    usuario.activo = false;
    await this.usuarioRepository.save(usuario);

    return { message: `Usuario #${id} desactivado correctamente` };
  }

  // ── PATCH /users/:id/make-admin — Solo ADMIN ─────────────

  async makeAdmin(id: number, usuarioActual: Usuario) {
    // No puede promoverte a ti mismo
    if (usuarioActual.id === id) {
      throw new BadRequestException('No puedes cambiar tu propio rol');
    }

    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException(`Usuario #${id} no encontrado`);

    const rolAdmin = await this.findRol('ADMIN');
    usuario.rol = rolAdmin;

    const actualizado = await this.usuarioRepository.save(usuario);
    return this.omitPassword(actualizado);
  }
}