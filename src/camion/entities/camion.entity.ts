// src/camion/entities/camion.entity.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Conduce } from '../../conduce/entities/conduce.entity';

@Entity('camion')
export class Camion {
  @ApiProperty({ example: 'ZAC-123-A', description: 'Matrícula única del camión' })
  @PrimaryColumn({ length: 15 })
  matricula !: string;

  @ApiProperty({ example: 350, description: 'Potencia en HP' })
  @Column()
  potencia !: number;

  @ApiProperty({ example: 'Kenworth T680' })
  @Column({ length: 45 })
  modelo !: string;

  @ApiPropertyOptional({ example: 'Carga pesada' })
  @Column({ length: 45, nullable: true })
  tipo !: string;

  @OneToMany(() => Conduce, (conduce) => conduce.camion)
  conduce !: Conduce[];
}