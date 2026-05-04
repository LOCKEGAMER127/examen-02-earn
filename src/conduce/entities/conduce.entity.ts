import { ApiProperty } from '@nestjs/swagger';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Camion } from '../../camion/entities/camion.entity';
import { Camionero } from '../../camionero/entities/camionero.entity';

@Entity('conduce')
export class Conduce {
  @ApiProperty({ example: 'ZAC-123-A', description: 'Matrícula del camión' })
  @PrimaryColumn({ name: 'camion_matricula', length: 15 })
  camionMatricula !: string;

  @ApiProperty({ example: 123456789, description: 'RFC del camionero' })
  @PrimaryColumn({ name: 'camionero_rfc' })
  camioneroRfc !: number;

  // Relación con Camion
  @ManyToOne(() => Camion, (camion) => camion.conduce, { eager: true })
  @JoinColumn({ name: 'camion_matricula' })
  camion !: Camion;

  // Relación con Camionero
  @ManyToOne(() => Camionero, (camionero) => camionero.conduce, { eager: true })
  @JoinColumn({ name: 'camionero_rfc' })
  camionero !: Camionero;
}