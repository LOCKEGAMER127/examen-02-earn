import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decotators/roles.decorator';
import { ConduceService } from './conduce.service';
import { CreateConduceDto } from './dto/create-conduce.dto';
import { DeleteConduceDto } from './dto/delete-conduce.dto';

@ApiTags('Conduce')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('conduce')
export class ConduceController {
  constructor(private readonly conduceService: ConduceService) {}

  @Post()
  @Roles('DEVELOPER')
  @ApiOperation({ summary: 'Asignar camionero a camión — Solo DEVELOPER' })
  @ApiResponse({ status: 201, description: 'Asignación creada' })
  @ApiResponse({ status: 400, description: 'Asignación ya existente o datos inválidos' })
  @ApiResponse({ status: 404, description: 'Camión o camionero no encontrados' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  create(@Body() createConduceDto: CreateConduceDto) {
    return this.conduceService.create(createConduceDto);
  }

  @Get()
  @Roles('ADMIN', 'DEVELOPER')
  @ApiOperation({ summary: 'Listar todas las asignaciones — ADMIN y DEVELOPER' })
  @ApiResponse({ status: 200, description: 'Lista de asignaciones camión-camionero' })
  findAll() {
    return this.conduceService.findAll();
  }

  @Get('camion/:matricula')
  @Roles('ADMIN', 'DEVELOPER')
  @ApiOperation({ summary: 'Camioneros asignados a un camión — ADMIN y DEVELOPER' })
  @ApiResponse({ status: 200, description: 'Lista de asignaciones del camión' })
  @ApiResponse({ status: 404, description: 'Camión no encontrado' })
  findByCamion(@Param('matricula') matricula: string) {
    return this.conduceService.findByCamion(matricula);
  }

  @Get('camionero/:rfc')
  @Roles('ADMIN', 'DEVELOPER')
  @ApiOperation({ summary: 'Camiones asignados a un camionero — ADMIN y DEVELOPER' })
  @ApiResponse({ status: 200, description: 'Lista de asignaciones del camionero' })
  @ApiResponse({ status: 404, description: 'Camionero no encontrado' })
  findByCamionero(@Param('rfc', ParseIntPipe) rfc: number) {
    return this.conduceService.findByCamionero(rfc);
  }

  @Delete()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Eliminar asignación camión-camionero — Solo ADMIN' })
  @ApiResponse({ status: 200, description: 'Asignación eliminada' })
  @ApiResponse({ status: 404, description: 'Asignación no encontrada' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  remove(@Body() deleteConduceDto: DeleteConduceDto) {
    return this.conduceService.remove(deleteConduceDto);
  }
}