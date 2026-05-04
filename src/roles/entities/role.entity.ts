import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../usuarios/entities/usuario.entity";

@Entity('roles')
export class Rol {
    @ApiProperty({ example : 1, description : 'ID rol'})
    @PrimaryGeneratedColumn()
    id !: number;

    @ApiProperty({ example : 'admin', description : 'Nombre del rol' })
    @Column({ unique : true, length : 20 })
    nombre !: string;

    @OneToMany(() => Usuario, usuario => usuario.rol)
    usuarios !: Usuario[];
}