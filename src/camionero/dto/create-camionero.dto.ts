import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min, MinLength, } from 'class-validator';

export class CreateCamioneroDto {
  @ApiProperty({ example: 123456789, description: 'RFC único del camionero' })
  @IsInt()
  @IsPositive()
  rfc !: number;

  @ApiProperty({ example: 'Carlos López' })
  @IsString()
  @MinLength(2)
  @MaxLength(45)
  nombre !: string;

  @ApiProperty({ example: '4921234567' })
  @IsString()
  @MinLength(7)
  @MaxLength(45)
  telefono !: string;

  @ApiProperty({ example: 'Av. Hidalgo 123' })
  @IsString()
  @MaxLength(45)
  direccion !: string;

  @ApiProperty({ example: 'Fresnillo' })
  @IsString()
  @MaxLength(45)
  poblacion !: string;

  @ApiProperty({ example: 'Colonia Centro' })
  @IsString()
  @MaxLength(45)
  camionerocol !: string;

  @ApiProperty({ example: 12500.00 })
  @IsNumber()
  @Min(0)
  salario !: number;

  @ApiPropertyOptional({ example: 3, description: 'ID del usuario del sistema asociado (opcional)' })
  @IsOptional()
  @IsInt()
  @IsPositive()
  usuarioId ?: number;
}