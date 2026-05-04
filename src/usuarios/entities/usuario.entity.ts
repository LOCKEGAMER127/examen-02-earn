// src/usuarios/entities/usuario.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, } from 'typeorm';
import { Rol } from '../../roles/entities/role.entity';

@Entity('usuarios')
export class Usuario {
  @ApiProperty({ example: 1, description: 'ID del usuario' })
  @PrimaryGeneratedColumn()
  id !: number;

  @ApiProperty({ example: 'Juan Pérez' })
  @Column({ length: 45 })
  nombre !: string;

  @ApiProperty({ example: 'juanperez' })
  @Index({ unique: true })
  @Column({ length: 45 })
  username !: string;

  // No se expone en Swagger — nunca debe devolverse en responses
  @Column({ length: 255 })
  password !: string;

  @ApiProperty({ example: true })
  @Column({ default: true })
  activo !: boolean;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  @CreateDateColumn({ name: 'creado_en' })
  creadoEn !: Date;

  // Relación con Rol
  @ManyToOne(() => Rol, (rol) => rol.usuarios, { eager: true })
  @JoinColumn({ name: 'rol_id' })
  rol !: Rol;
}