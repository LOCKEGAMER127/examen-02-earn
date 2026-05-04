import { BadRequestException, Injectable, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Rol } from '../roles/entities/role.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,

    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { nombre, username, password } = registerDto;

    // Verificar si el username ya existe
    const existe = await this.usuarioRepository.findOne({ where: { username } });
    if (existe) throw new BadRequestException('El username ya está en uso');

    // Obtener rol USER por defecto (id: 1)
    const rol = await this.rolRepository.findOne({ where: { nombre: 'USER' } });
    if (!rol) throw new BadRequestException('Rol USER no encontrado en BD');

    // Encriptar contraseña
    const hash = await bcrypt.hash(password, 10);

    const usuario = this.usuarioRepository.create({
      nombre,
      username,
      password: hash,
      rol,
    });

    const guardado = await this.usuarioRepository.save(usuario);

    // Nunca devolver el password
    const { password: _, ...resultado } = guardado;
    return resultado;
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const usuario = await this.usuarioRepository.findOne({ where: { username, activo: true } });
    if (!usuario) throw new UnauthorizedException('Credenciales inválidas');

    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) throw new UnauthorizedException('Credenciales inválidas');

    // Payload del JWT según requerimientos
    const payload = {
      id: usuario.id,
      username: usuario.username,
      role: usuario.rol.nombre,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        username: usuario.username,
        rol: usuario.rol.nombre,
      },
    };
  }
}