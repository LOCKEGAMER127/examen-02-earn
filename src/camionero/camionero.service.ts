import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Camionero } from './entities/camionero.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { CreateCamioneroDto } from './dto/create-camionero.dto';
import { UpdateCamioneroDto } from './dto/update-camionero.dto';

@Injectable()
export class CamioneroService {
  constructor(
    @InjectRepository(Camionero)
    private readonly camioneroRepository: Repository<Camionero>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  // ── Helpers ───────────────────────────────────────────────

  private async resolverUsuario(usuarioId?: number): Promise<Usuario | null> {
    if (!usuarioId) return null;
    const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
    if (!usuario) throw new NotFoundException(`Usuario #${usuarioId} no encontrado`);
    return usuario;
  }

  // ── POST /camionero — Solo DEVELOPER ─────────────────────

  async create(createCamioneroDto: CreateCamioneroDto) {
    const { usuarioId, ...datos } = createCamioneroDto;

    const existe = await this.camioneroRepository.findOne({ where: { rfc: datos.rfc } });
    if (existe) throw new BadRequestException(`RFC ${datos.rfc} ya registrado`);

    const usuario = await this.resolverUsuario(usuarioId);

    const camionero = this.camioneroRepository.create({
      ...datos,
      ...(usuario && { usuario }),
    });

    return this.camioneroRepository.save(camionero);
  }

  // ── GET /camionero — ADMIN y DEVELOPER ───────────────────

  async findAll() {
    return this.camioneroRepository.find();
  }

  // ── GET /camionero/:rfc ───────────────────────────────────

  async findOne(rfc: number) {
    const camionero = await this.camioneroRepository.findOne({ where: { rfc } });
    if (!camionero) throw new NotFoundException(`Camionero con RFC ${rfc} no encontrado`);
    return camionero;
  }

  // ── PATCH /camionero/:rfc — Solo DEVELOPER ────────────────

  async update(rfc: number, updateCamioneroDto: UpdateCamioneroDto) {
    const camionero = await this.findOne(rfc);
    const { usuarioId, ...datos } = updateCamioneroDto;

    // Si viene usuarioId lo resolvemos, si viene explícitamente null desasociamos
    if (usuarioId !== undefined) {
      const usuario = await this.resolverUsuario(usuarioId);
      if (usuario) {
        camionero.usuario = usuario;
      }
    }

    Object.assign(camionero, datos);
    return this.camioneroRepository.save(camionero);
  }

  // ── DELETE /camionero/:rfc — Solo ADMIN ──────────────────

  async remove(rfc: number) {
    const camionero = await this.findOne(rfc);
    await this.camioneroRepository.remove(camionero);
    return { message: `Camionero con RFC ${rfc} eliminado correctamente` };
  }
}