import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaqueteController } from './paquete.controller';
import { PaqueteService } from './paquete.service';
import { Paquete } from './entities/paquete.entity';
import { Camionero } from '../camionero/entities/camionero.entity';
import { Ciudad } from '../ciudad/entities/ciudad.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Paquete, Camionero, Ciudad]),
    AuthModule,
  ],
  controllers: [PaqueteController],
  providers: [PaqueteService],
  exports: [PaqueteService],
})
export class PaqueteModule {}