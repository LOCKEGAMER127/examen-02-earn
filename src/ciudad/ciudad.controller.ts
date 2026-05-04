import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decotators/roles.decorator';
import { CiudadService } from './ciudad.service';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';

@ApiTags('Ciudad')  
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ciudad')
export class CiudadController {
  constructor(private readonly cuidadService: CiudadService) {}

  @Post()
  @Roles('DEVELOPER')
  @ApiOperation({ summary: 'Crear ciudad — Solo DEVELOPER' })
  @ApiResponse({ status: 201, description: 'Ciudad creada' })
  @ApiResponse({ status: 400, description: 'Código ya registrado o datos inválidos' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  create(@Body() createCiudadDto: CreateCiudadDto) {
    return this.cuidadService.create(createCiudadDto);
  }

  @Get()
  @Roles('ADMIN', 'DEVELOPER', 'USER')
  @ApiOperation({ summary: 'Listar todas las ciudades — Todos los roles' })
  @ApiResponse({ status: 200, description: 'Lista de ciudades' })
  findAll() {
    return this.cuidadService.findAll();
  }

  @Get(':codigo')
  @Roles('ADMIN', 'DEVELOPER', 'USER')
  @ApiOperation({ summary: 'Obtener ciudad por código — Todos los roles' })
  @ApiResponse({ status: 200, description: 'Ciudad encontrada' })
  @ApiResponse({ status: 404, description: 'Ciudad no encontrada' })
  findOne(@Param('codigo', ParseIntPipe) codigo: number) {
    return this.cuidadService.findOne(codigo);
  }

  @Patch(':codigo')
  @Roles('DEVELOPER')
  @ApiOperation({ summary: 'Actualizar ciudad — Solo DEVELOPER' })
  @ApiResponse({ status: 200, description: 'Ciudad actualizada' })
  @ApiResponse({ status: 404, description: 'Ciudad no encontrada' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  update(
    @Param('codigo', ParseIntPipe) codigo: number,
    @Body() updateCiudadDto: UpdateCiudadDto,
  ) {
    return this.cuidadService.update(codigo, updateCiudadDto);
  }

  @Delete(':codigo')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Eliminar ciudad — Solo ADMIN' })
  @ApiResponse({ status: 200, description: 'Ciudad eliminada' })
  @ApiResponse({ status: 404, description: 'Ciudad no encontrada' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  remove(@Param('codigo', ParseIntPipe) codigo: number) {
    return this.cuidadService.remove(codigo);
  }
}