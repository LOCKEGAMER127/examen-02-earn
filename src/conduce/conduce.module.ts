import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConduceController } from './conduce.controller';
import { ConduceService } from './conduce.service';
import { Conduce } from './entities/conduce.entity';
import { Camion } from '../camion/entities/camion.entity';
import { Camionero } from '../camionero/entities/camionero.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conduce, Camion, Camionero]),
    AuthModule,
  ],
  controllers: [ConduceController],
  providers: [ConduceService],
})
export class ConduceModule {}