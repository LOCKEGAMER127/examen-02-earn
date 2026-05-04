import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre completo' })
  @IsString()
  @MinLength(2)
  @MaxLength(45)
  nombre !: string;

  @ApiProperty({ example: 'juanperez', description: 'Username único' })
  @IsString()
  @MinLength(3)
  @MaxLength(45)
  username !: string;

  @ApiProperty({ example: 'Pass1234!', description: 'Contraseña mínimo 6 caracteres' })
  @IsString()
  @MinLength(6)
  password !: string;
}