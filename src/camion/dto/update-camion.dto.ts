import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateCamionDto {
  @ApiPropertyOptional({ example: 400 })
  @IsOptional()
  @IsInt()
  @IsPositive()
  potencia?: number;

  @ApiPropertyOptional({ example: 'Peterbilt 579' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(45)
  modelo?: string;

  @ApiPropertyOptional({ example: 'Refrigerado' })
  @IsOptional()
  @IsString()
  @MaxLength(45)
  tipo?: string;
}