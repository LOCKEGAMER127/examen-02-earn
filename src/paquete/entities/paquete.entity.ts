// src/paquete/entities/paquete.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Camionero } from '../../camionero/entities/camionero.entity';
import { Ciudad } from '../../ciudad/entities/ciudad.entity';

@Entity('paquete')
export class Paquete {
  @ApiProperty({ example: 1001, description: 'Código único del paquete' })
  @PrimaryColumn()
  codigo !: number;

  @ApiProperty({ example: 'Electrónicos frágiles' })
  @Column({ length: 50 })
  descripcion !: string;

  @ApiProperty({ example: 'María González' })
  @Column({ length: 45 })
  destinatario !: string;

  @ApiProperty({ example: 'Av. Juárez 456' })
  @Column({ length: 45 })
  direccion !: string;

  // Relación con Camionero
  @ManyToOne(() => Camionero, (camionero) => camionero.paquetes, { eager: true })
  @JoinColumn({ name: 'camionero_rfc' })
  camionero !: Camionero;

  // Relación con Ciudad
  @ManyToOne(() => Ciudad, (ciudad) => ciudad.paquetes, { eager: true })
  @JoinColumn({ name: 'ciudad_codigo' })
  ciudad !: Ciudad;
}