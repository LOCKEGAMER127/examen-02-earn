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
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Usuario, Rol, Camionero, Camion, Ciudad, Paquete, Conduce],
      synchronize: false,
      ssl: { rejectUnauthorized: false }, // necesario para Aiven
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