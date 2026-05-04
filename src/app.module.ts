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
      host: process.env.DB_HOST ?? process.env.HOST,
      port: Number(process.env.DB_PORT) ?? process.env.PORT,
      username: process.env.DB_USER ?? process.env.USERNAME,
      password: process.env.DB_PASS ?? process.env.PASSWORD,
      database: process.env.DB_NAME ?? process.env.DATABASE,
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