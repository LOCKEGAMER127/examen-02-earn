import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';

// Para eliminar necesitamos ambas PKs — las pasamos por body
// ya que DELETE con body es más explícito que doble param en este caso
export class DeleteConduceDto {
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