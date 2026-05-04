import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class LoginDto {
    @ApiProperty({ example : 'juan123', description : "Nombre del Usuario"})
    @IsString()
    username !: string;

    @ApiProperty({ example : 'password123', description : "Contraseña del Usuario"})
    @IsString()
    @MinLength(6)
    password !: string;
}