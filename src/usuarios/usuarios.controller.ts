import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards, } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decotators/roles.decorator';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@ApiTags('Usuarios')
@ApiBearerAuth()                      // todos los endpoints requieren JWT
@UseGuards(JwtAuthGuard, RolesGuard) // guards aplicados a todo el controller
@Controller('users')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // POST /users — Solo DEVELOPER
  @Post()
  @Roles('DEVELOPER')
  @ApiOperation({ summary: 'Crear usuario — Solo DEVELOPER' })
  @ApiResponse({ status: 201, description: 'Usuario creado' })
  @ApiResponse({ status: 400, description: 'Username en uso o datos inválidos' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  // GET /users — ADMIN/DEVELOPER: todos | USER: solo el suyo
  @Get()
  @Roles('ADMIN', 'DEVELOPER', 'USER')
  @ApiOperation({ summary: 'Listar usuarios (resultado según rol)' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios o perfil propio' })
  findAll(@Request() req) {
    return this.usuariosService.findAll(req.user);
  }

  // PATCH /users/:id — Solo DEVELOPER
  @Patch(':id')
  @Roles('DEVELOPER')
  @ApiOperation({ summary: 'Actualizar usuario — Solo DEVELOPER' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  // DELETE /users/:id — Solo ADMIN (soft delete)
  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Desactivar usuario — Solo ADMIN' })
  @ApiResponse({ status: 200, description: 'Usuario desactivado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.remove(id);
  }

  // PATCH /users/:id/make-admin — Solo ADMIN
  @Patch(':id/make-admin')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Promover usuario a ADMIN — Solo ADMIN' })
  @ApiResponse({ status: 200, description: 'Usuario promovido a ADMIN' })
  @ApiResponse({ status: 400, description: 'No puedes cambiar tu propio rol' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  makeAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    return this.usuariosService.makeAdmin(id, req.user);
  }
}