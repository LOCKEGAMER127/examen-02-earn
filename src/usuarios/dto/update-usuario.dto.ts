import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsOptional, IsBoolean } from 'class-validator';

export class UpdateUsuarioDto {
  @ApiPropertyOptional({ example: 'Juan Actualizado' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(45)
  nombre ?: string;

  @ApiPropertyOptional({ example: 'juannuevo' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(45)
  username ?: string;

  @ApiPropertyOptional({ example: 'NuevaPass123!' })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password ?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  activo ?: boolean;
}