import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conduce } from './entities/conduce.entity';
import { Camion } from '../camion/entities/camion.entity';
import { Camionero } from '../camionero/entities/camionero.entity';
import { CreateConduceDto } from './dto/create-conduce.dto';
import { DeleteConduceDto } from './dto/delete-conduce.dto';

@Injectable()
export class ConduceService {
  constructor(
    @InjectRepository(Conduce)
    private readonly conduceRepository: Repository<Conduce>,

    @InjectRepository(Camion)
    private readonly camionRepository: Repository<Camion>,

    @InjectRepository(Camionero)
    private readonly camioneroRepository: Repository<Camionero>,
  ) {}

  // ── Helpers ───────────────────────────────────────────────

  private async resolverCamion(matricula: string): Promise<Camion> {
    const camion = await this.camionRepository.findOne({ where: { matricula } });
    if (!camion) throw new NotFoundException(`Camión con matrícula ${matricula} no encontrado`);
    return camion;
  }

  private async resolverCamionero(rfc: number): Promise<Camionero> {
    const camionero = await this.camioneroRepository.findOne({ where: { rfc } });
    if (!camionero) throw new NotFoundException(`Camionero con RFC ${rfc} no encontrado`);
    return camionero;
  }

  private async resolverConduce(
    camionMatricula: string,
    camioneroRfc: number,
  ): Promise<Conduce> {
    const conduce = await this.conduceRepository.findOne({
      where: { camionMatricula, camioneroRfc },
    });
    if (!conduce) {
      throw new NotFoundException(
        `Asignación entre camión ${camionMatricula} y camionero ${camioneroRfc} no encontrada`,
      );
    }
    return conduce;
  }

  // ── POST /conduce — Solo DEVELOPER ───────────────────────

  async create(createConduceDto: CreateConduceDto) {
    const { camionMatricula, camioneroRfc } = createConduceDto;

    // Validar que ambas entidades existan
    await this.resolverCamion(camionMatricula);
    await this.resolverCamionero(camioneroRfc);

    // Verificar que la asignación no exista ya
    const existe = await this.conduceRepository.findOne({
      where: { camionMatricula, camioneroRfc },
    });
    if (existe) {
      throw new BadRequestException(
        `El camionero ${camioneroRfc} ya está asignado al camión ${camionMatricula}`,
      );
    }

    const conduce = this.conduceRepository.create({ camionMatricula, camioneroRfc });
    return this.conduceRepository.save(conduce);
  }

  // ── GET /conduce — ADMIN y DEVELOPER ─────────────────────

  async findAll() {
    return this.conduceRepository.find();
  }

  // ── GET /conduce/camion/:matricula — por camión ───────────

  async findByCamion(matricula: string) {
    await this.resolverCamion(matricula); // valida existencia

    return this.conduceRepository.find({
      where: { camionMatricula: matricula },
    });
  }

  // ── GET /conduce/camionero/:rfc — por camionero ───────────

  async findByCamionero(rfc: number) {
    await this.resolverCamionero(rfc); // valida existencia

    return this.conduceRepository.find({
      where: { camioneroRfc: rfc },
    });
  }

  // ── DELETE /conduce — Solo ADMIN ──────────────────────────

  async remove(deleteConduceDto: DeleteConduceDto) {
    const { camionMatricula, camioneroRfc } = deleteConduceDto;
    const conduce = await this.resolverConduce(camionMatricula, camioneroRfc);

    await this.conduceRepository.remove(conduce);
    return {
      message: `Asignación entre camión ${camionMatricula} y camionero ${camioneroRfc} eliminada correctamente`,
    };
  }
}