import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/decotators/roles.decorator';
import { CamionService } from './camion.service';
import { CreateCamionDto } from './dto/create-camion.dto';
import { UpdateCamionDto } from './dto/update-camion.dto';

@ApiTags('Camion')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('camion')
export class CamionController {
  constructor(private readonly camionService: CamionService) {}

  @Post()
  @Roles('DEVELOPER')
  @ApiOperation({ summary: 'Crear camión — Solo DEVELOPER' })
  @ApiResponse({ status: 201, description: 'Camión creado' })
  @ApiResponse({ status: 400, description: 'Matrícula ya registrada o datos inválidos' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  create(@Body() createCamionDto: CreateCamionDto) {
    return this.camionService.create(createCamionDto);
  }

  @Get()
  @Roles('ADMIN', 'DEVELOPER')
  @ApiOperation({ summary: 'Listar todos los camiones — ADMIN y DEVELOPER' })
  @ApiResponse({ status: 200, description: 'Lista de camiones' })
  findAll() {
    return this.camionService.findAll();
  }

  @Get(':matricula')
  @Roles('ADMIN', 'DEVELOPER')
  @ApiOperation({ summary: 'Obtener camión por matrícula — ADMIN y DEVELOPER' })
  @ApiResponse({ status: 200, description: 'Camión encontrado' })
  @ApiResponse({ status: 404, description: 'Camión no encontrado' })
  findOne(@Param('matricula') matricula: string) {
    return this.camionService.findOne(matricula);
  }

  @Patch(':matricula')
  @Roles('DEVELOPER')
  @ApiOperation({ summary: 'Actualizar camión — Solo DEVELOPER' })
  @ApiResponse({ status: 200, description: 'Camión actualizado' })
  @ApiResponse({ status: 404, description: 'Camión no encontrado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  update(
    @Param('matricula') matricula: string,
    @Body() updateCamionDto: UpdateCamionDto,
  ) {
    return this.camionService.update(matricula, updateCamionDto);
  }

  @Delete(':matricula')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Eliminar camión — Solo ADMIN' })
  @ApiResponse({ status: 200, description: 'Camión eliminado' })
  @ApiResponse({ status: 404, description: 'Camión no encontrado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  remove(@Param('matricula') matricula: string) {
    return this.camionService.remove(matricula);
  }
}