import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCamionDto {
  @ApiProperty({ example: 'ZAC-123-A', description: 'Matrícula única (máx 15 caracteres)' })
  @IsString()
  @MinLength(1)
  @MaxLength(15)
  matricula !: string;

  @ApiProperty({ example: 350, description: 'Potencia en HP' })
  @IsInt()
  @IsPositive()
  potencia !: number;

  @ApiProperty({ example: 'Kenworth T680' })
  @IsString()
  @MinLength(2)
  @MaxLength(45)
  modelo !: string;

  @ApiPropertyOptional({ example: 'Carga pesada' })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  tipo ?: string;
}