import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadController } from './ciudad.controller';
import { CiudadService } from './ciudad.service';
import { Ciudad } from './entities/ciudad.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ciudad]),
    AuthModule,
  ],
  controllers: [CiudadController],
  providers: [CiudadService],
  exports: [CiudadService],
})
export class CiudadModule {}