import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Conduce } from '../../conduce/entities/conduce.entity';
import { Paquete } from '../../paquete/entities/paquete.entity';

@Entity('camionero')
export class Camionero {
  @ApiProperty({ example: 123456789, description: 'RFC del camionero (clave primaria)' })
  @PrimaryColumn()
  rfc !: number;

  @ApiProperty({ example: 'Carlos López' })
  @Column({ length: 45 })
  nombre !: string;

  @ApiProperty({ example: '4921234567' })
  @Column({ length: 45 })
  telefono !: string;

  @ApiProperty({ example: 'Av. Hidalgo 123' })
  @Column({ length: 45 })
  direccion !: string;

  @ApiProperty({ example: 'Fresnillo' })
  @Column({ length: 45 })
  poblacion !: string;

  @ApiProperty({ example: 'Colonia Centro' })
  @Column({ length: 45 })
  camionerocol !: string;

  @ApiProperty({ example: 12500.00 })
  @Column({ type: 'double', precision: 8, scale: 2 })
  salario !: number;

  // Relación opcional con usuarios
  @ManyToOne(() => Usuario, { nullable: true, eager: true })
  @JoinColumn({ name: 'usuario_id' })
  usuario !: Usuario;

  // Relaciones hacia otras entidades
  @OneToMany(() => Paquete, (paquete) => paquete.camionero)
  paquetes !: Paquete[];

  @OneToMany(() => Conduce, (conduce) => conduce.camionero)
  conduce !: Conduce[];
}