import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min, MinLength, } from 'class-validator';

export class UpdateCamioneroDto {
  @ApiPropertyOptional({ example: 'Carlos Actualizado' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(45)
  nombre?: string;

  @ApiPropertyOptional({ example: '4929876543' })
  @IsOptional()
  @IsString()
  @MinLength(7)
  @MaxLength(45)
  telefono?: string;

  @ApiPropertyOptional({ example: 'Calle Nueva 456' })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  direccion?: string;

  @ApiPropertyOptional({ example: 'Zacatecas' })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  poblacion?: string;

  @ApiPropertyOptional({ example: 'Col. Moderna' })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  camionerocol?: string;

  @ApiPropertyOptional({ example: 15000.00 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  salario?: number;

  @ApiPropertyOptional({ example: 4, description: 'ID del usuario asociado (null para desasociar)' })
  @IsOptional()
  @IsInt()
  @IsPositive()
  usuarioId?: number;
}