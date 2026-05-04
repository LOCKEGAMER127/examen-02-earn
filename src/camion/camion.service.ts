import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Camion } from './entities/camion.entity';
import { CreateCamionDto } from './dto/create-camion.dto';
import { UpdateCamionDto } from './dto/update-camion.dto';

@Injectable()
export class CamionService {
  constructor(
    @InjectRepository(Camion)
    private readonly camionRepository: Repository<Camion>,
  ) {}

  // ── POST /camion — Solo DEVELOPER ────────────────────────

  async create(createCamionDto: CreateCamionDto) {
    const existe = await this.camionRepository.findOne({
      where: { matricula: createCamionDto.matricula },
    });
    if (existe) throw new BadRequestException(`Matrícula ${createCamionDto.matricula} ya registrada`);

    const camion = this.camionRepository.create(createCamionDto);
    return this.camionRepository.save(camion);
  }

  // ── GET /camion — ADMIN y DEVELOPER ──────────────────────

  async findAll() {
    return this.camionRepository.find();
  }

  // ── GET /camion/:matricula ────────────────────────────────

  async findOne(matricula: string) {
    const camion = await this.camionRepository.findOne({ where: { matricula } });
    if (!camion) throw new NotFoundException(`Camión con matrícula ${matricula} no encontrado`);
    return camion;
  }

  // ── PATCH /camion/:matricula — Solo DEVELOPER ─────────────

  async update(matricula: string, updateCamionDto: UpdateCamionDto) {
    const camion = await this.findOne(matricula);
    Object.assign(camion, updateCamionDto);
    return this.camionRepository.save(camion);
  }

  // ── DELETE /camion/:matricula — Solo ADMIN ────────────────

  async remove(matricula: string) {
    const camion = await this.findOne(matricula);
    await this.camionRepository.remove(camion);
    return { message: `Camión con matrícula ${matricula} eliminado correctamente` };
  }
}