// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CamioneroModule } from './camionero/camionero.module';
import { CamionModule } from './camion/camion.module';
import { CiudadModule } from './ciudad/ciudad.module';
import { PaqueteModule } from './paquete/paquete.module';
import { ConduceModule } from './conduce/conduce.module';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Rol } from './roles/entities/role.entity';
import { Camionero } from './camionero/entities/camionero.entity';
import { Camion } from './camion/entities/camion.entity';
import { Ciudad } from './ciudad/entities/ciudad.entity';
import { Paquete } from './paquete/entities/paquete.entity';
import { Conduce } from './conduce/entities/conduce.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT) ?? 3306,
      username: process.env.DB_USER ?? 'root',
      password: process.env.DB_PASS ?? '',
      database: process.env.DB_NAME ?? 'Citas',
      entities: [Usuario, Rol, Camionero, Camion, Ciudad, Paquete, Conduce],
      synchronize: false,
    }),
    AuthModule,
    UsuariosModule,
    CamioneroModule,
    CamionModule,
    CiudadModule,
    PaqueteModule,
    ConduceModule,
  ],
})
export class AppModule {}