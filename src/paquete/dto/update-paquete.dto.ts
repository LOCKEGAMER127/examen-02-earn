import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive, IsString, MaxLength, MinLength, } from 'class-validator';

export class UpdatePaqueteDto {
  @ApiPropertyOptional({ example: 'Ropa y accesorios' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  descripcion?: string;

  @ApiPropertyOptional({ example: 'Pedro Ramírez' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(45)
  destinatario?: string;

  @ApiPropertyOptional({ example: 'Calle Morelos 789' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(45)
  direccion?: string;

  @ApiPropertyOptional({ example: 987654321, description: 'RFC del nuevo camionero asignado' })
  @IsOptional()
  @IsInt()
  @IsPositive()
  camioneroRfc?: number;

  @ApiPropertyOptional({ example: 32002, description: 'Código de la nueva ciudad destino' })
  @IsOptional()
  @IsInt()
  @IsPositive()
  ciudadCodigo?: number;
}