import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CamioneroController } from './camionero.controller';
import { CamioneroService } from './camionero.service';
import { Camionero } from './entities/camionero.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Camionero, Usuario]),
    AuthModule,
  ],
  controllers: [CamioneroController],
  providers: [CamioneroService],
  exports: [CamioneroService],
})
export class CamioneroModule {}