import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paquete } from './entities/paquete.entity';
import { Camionero } from '../camionero/entities/camionero.entity';
import { Ciudad } from '../ciudad/entities/ciudad.entity';
import { CreatePaqueteDto } from './dto/create-paquete.dto';
import { UpdatePaqueteDto } from './dto/update-paquete.dto';

@Injectable()
export class PaqueteService {
  constructor(
    @InjectRepository(Paquete)
    private readonly paqueteRepository: Repository<Paquete>,

    @InjectRepository(Camionero)
    private readonly camioneroRepository: Repository<Camionero>,

    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad >,
  ) {}

  // ── Helpers ───────────────────────────────────────────────

  private async resolverCamionero(rfc: number): Promise<Camionero> {
    const camionero = await this.camioneroRepository.findOne({ where: { rfc } });
    if (!camionero) throw new NotFoundException(`Camionero con RFC ${rfc} no encontrado`);
    return camionero;
  }

  private async resolverCiudad(codigo: number): Promise<Ciudad> {
    const ciudad = await this.ciudadRepository.findOne({ where: { codigo } });
    if (!ciudad) throw new NotFoundException(`Ciudad con código ${codigo} no encontrada`);
    return ciudad;
  }

  // ── POST /paquete — Solo DEVELOPER ───────────────────────

  async create(createPaqueteDto: CreatePaqueteDto) {
    const { camioneroRfc, ciudadCodigo, ...datos } = createPaqueteDto;

    const existe = await this.paqueteRepository.findOne({
      where: { codigo: datos.codigo },
    });
    if (existe) throw new BadRequestException(`Código de paquete ${datos.codigo} ya registrado`);

    const camionero = await this.resolverCamionero(camioneroRfc);
    const ciudad    = await this.resolverCiudad(ciudadCodigo);

    const paquete = this.paqueteRepository.create({ ...datos, camionero, ciudad });
    return this.paqueteRepository.save(paquete);
  }

  // ── GET /paquete — ADMIN y DEVELOPER ─────────────────────

  async findAll() {
    return this.paqueteRepository.find();
  }

  // ── GET /paquete/:codigo ──────────────────────────────────

  async findOne(codigo: number) {
    const paquete = await this.paqueteRepository.findOne({ where: { codigo } });
    if (!paquete) throw new NotFoundException(`Paquete con código ${codigo} no encontrado`);
    return paquete;
  }

  // ── GET /paquete/camionero/:rfc — paquetes por camionero ──

  async findByCamionero(rfc: number) {
    await this.resolverCamionero(rfc); // valida que exista

    return this.paqueteRepository.find({
      where: { camionero: { rfc } },
    });
  }

  // ── GET /paquete/ciudad/:codigo — paquetes por ciudad ─────

  async findByCiudad(codigo: number) {
    await this.resolverCiudad(codigo); // valida que exista

    return this.paqueteRepository.find({
      where: { ciudad: { codigo } },
    });
  }

  // ── PATCH /paquete/:codigo — Solo DEVELOPER ───────────────

  async update(codigo: number, updatePaqueteDto: UpdatePaqueteDto) {
    const paquete = await this.findOne(codigo);
    const { camioneroRfc, ciudadCodigo, ...datos } = updatePaqueteDto;

    if (camioneroRfc) paquete.camionero = await this.resolverCamionero(camioneroRfc);
    if (ciudadCodigo) paquete.ciudad    = await this.resolverCiudad(ciudadCodigo);

    Object.assign(paquete, datos);
    return this.paqueteRepository.save(paquete);
  }

  // ── DELETE /paquete/:codigo — Solo ADMIN ──────────────────

  async remove(codigo: number) {
    const paquete = await this.findOne(codigo);
    await this.paqueteRepository.remove(paquete);
    return { message: `Paquete con código ${codigo} eliminado correctamente` };
  }
}