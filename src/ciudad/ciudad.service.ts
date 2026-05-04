import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';

@Injectable()
export class CiudadService {
  constructor(
    @InjectRepository(Ciudad)
    private readonly cuidadRepository: Repository<Ciudad>,
  ) {}

  // ── POST /cuidad — Solo DEVELOPER ────────────────────────

  async create(createCuidadDto: CreateCiudadDto) {
    const existe = await this.cuidadRepository.findOne({
      where: { codigo: createCuidadDto.codigo },
    });
    if (existe) throw new BadRequestException(`Código ${createCuidadDto.codigo} ya registrado`);

    const cuidad = this.cuidadRepository.create(createCuidadDto);
    return this.cuidadRepository.save(cuidad);
  }

  // ── GET /cuidad — ADMIN, DEVELOPER y USER ────────────────

  async findAll() {
    return this.cuidadRepository.find();
  }

  // ── GET /cuidad/:codigo ───────────────────────────────────

  async findOne(codigo: number) {
    const cuidad = await this.cuidadRepository.findOne({ where: { codigo } });
    if (!cuidad) throw new NotFoundException(`Ciudad con código ${codigo} no encontrada`);
    return cuidad;
  }

  // ── PATCH /cuidad/:codigo — Solo DEVELOPER ────────────────

  async update(codigo: number, updateCuidadDto: UpdateCiudadDto) {
    const cuidad = await this.findOne(codigo);
    Object.assign(cuidad, updateCuidadDto);
    return this.cuidadRepository.save(cuidad);
  }

  // ── DELETE /cuidad/:codigo — Solo ADMIN ──────────────────

  async remove(codigo: number) {
    const cuidad = await this.findOne(codigo);
    await this.cuidadRepository.remove(cuidad);
    return { message: `Ciudad con código ${codigo} eliminada correctamente` };
  }
}