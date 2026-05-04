import { ApiProperty } from '@nestjs/swagger';
import {IsInt, IsPositive, IsString, MaxLength, MinLength, } from 'class-validator';

export class CreatePaqueteDto {
  @ApiProperty({ example: 1001, description: 'Código único del paquete' })
  @IsInt()
  @IsPositive()
  codigo !: number;

  @ApiProperty({ example: 'Electrónicos frágiles' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  descripcion !: string;

  @ApiProperty({ example: 'María González' })
  @IsString()
  @MinLength(2)
  @MaxLength(45)
  destinatario !: string;

  @ApiProperty({ example: 'Av. Juárez 456' })
  @IsString()
  @MinLength(2)
  @MaxLength(45)
  direccion !: string;

  @ApiProperty({ example: 123456789, description: 'RFC del camionero asignado' })
  @IsInt()
  @IsPositive()
  camioneroRfc !: number;

  @ApiProperty({ example: 32001, description: 'Código de la ciudad destino' })
  @IsInt()
  @IsPositive()
  ciudadCodigo !: number;
}