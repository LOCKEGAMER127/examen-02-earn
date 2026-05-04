import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCiudadDto {
  @ApiProperty({ example: 32001, description: 'Código único de la ciudad' })
  @IsInt()
  @IsPositive()
  codigo !: number;

  @ApiProperty({ example: 'Fresnillo' })
  @IsString()
  @MinLength(2)
  @MaxLength(45)
  nombre !: string;
}