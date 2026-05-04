import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateConduceDto {
  @ApiProperty({ example: 'ZAC-123-A', description: 'Matrícula del camión' })
  @IsString()
  @MinLength(1)
  @MaxLength(15)
  camionMatricula !: string;

  @ApiProperty({ example: 123456789, description: 'RFC del camionero' })
  @IsInt()
  @IsPositive()
  camioneroRfc !: number;
}