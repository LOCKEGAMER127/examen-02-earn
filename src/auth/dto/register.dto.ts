import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength } from "class-validator";

export class RegisterDto {
    @ApiProperty({ example : 'Juan', description : 'Nombre de usuario' })
    @IsString()
    @MinLength(2)
    @MaxLength(45)
    nombre !: string;

    @ApiProperty({ example : 'juan123', description : 'Nombre del usuario unico' })
    @IsString()
    @MinLength(3)
    @MaxLength(45)
    username !: string;

    @ApiProperty({ example : 'password123', description : 'Contraseña del usuario (minimo 6 caracteres)' })
    @IsString()
    @MinLength(6)
    password !: string;
}