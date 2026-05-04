import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Paquete } from '../../paquete/entities/paquete.entity';

@Entity('ciudad')
export class Ciudad {
  @ApiProperty({ example: 32001, description: 'Código único de la ciudad' })
  @PrimaryColumn()
  codigo !: number;

  @ApiProperty({ example: 'Fresnillo' })
  @Column({ length: 45 })
  nombre !: string;

  @OneToMany(() => Paquete, (paquete) => paquete.ciudad)
  paquetes !: Paquete[];
}