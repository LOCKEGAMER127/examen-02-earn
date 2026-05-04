import {  Body,  Controller,  Delete,  Get,  Param,  ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decotators/roles.decorator';
import { CamioneroService } from './camionero.service';
import { CreateCamioneroDto } from './dto/create-camionero.dto';
import { UpdateCamioneroDto } from './dto/update-camionero.dto';

@ApiTags('Camionero')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('camionero')
export class CamioneroController {
  constructor(private readonly camioneroService: CamioneroService) {}

  @Post()
  @Roles('DEVELOPER')
  @ApiOperation({ summary: 'Crear camionero — Solo DEVELOPER' })
  @ApiResponse({ status: 201, description: 'Camionero creado' })
  @ApiResponse({ status: 400, description: 'RFC ya registrado o datos inválidos' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  create(@Body() createCamioneroDto: CreateCamioneroDto) {
    return this.camioneroService.create(createCamioneroDto);
  }

  @Get()
  @Roles('ADMIN', 'DEVELOPER')
  @ApiOperation({ summary: 'Listar todos los camioneros — ADMIN y DEVELOPER' })
  @ApiResponse({ status: 200, description: 'Lista de camioneros' })
  findAll() {
    return this.camioneroService.findAll();
  }

  @Get(':rfc')
  @Roles('ADMIN', 'DEVELOPER')
  @ApiOperation({ summary: 'Obtener camionero por RFC — ADMIN y DEVELOPER' })
  @ApiResponse({ status: 200, description: 'Camionero encontrado' })
  @ApiResponse({ status: 404, description: 'Camionero no encontrado' })
  findOne(@Param('rfc', ParseIntPipe) rfc: number) {
    return this.camioneroService.findOne(rfc);
  }

  @Patch(':rfc')
  @Roles('DEVELOPER')
  @ApiOperation({ summary: 'Actualizar camionero — Solo DEVELOPER' })
  @ApiResponse({ status: 200, description: 'Camionero actualizado' })
  @ApiResponse({ status: 404, description: 'Camionero no encontrado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  update(
    @Param('rfc', ParseIntPipe) rfc: number,
    @Body() updateCamioneroDto: UpdateCamioneroDto,
  ) {
    return this.camioneroService.update(rfc, updateCamioneroDto);
  }

  @Delete(':rfc')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Eliminar camionero — Solo ADMIN' })
  @ApiResponse({ status: 200, description: 'Camionero eliminado' })
  @ApiResponse({ status: 404, description: 'Camionero no encontrado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  remove(@Param('rfc', ParseIntPipe) rfc: number) {
    return this.camioneroService.remove(rfc);
  }
}