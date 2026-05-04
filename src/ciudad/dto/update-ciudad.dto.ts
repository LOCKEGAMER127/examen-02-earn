import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateCiudadDto {
  @ApiPropertyOptional({ example: 'Zacatecas' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(45)
  nombre?: string;
}