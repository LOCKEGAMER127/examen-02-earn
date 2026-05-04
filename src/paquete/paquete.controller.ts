import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards,} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decotators/roles.decorator';
import { PaqueteService } from './paquete.service';
import { CreatePaqueteDto } from './dto/create-paquete.dto';
import { UpdatePaqueteDto } from './dto/update-paquete.dto';

@ApiTags('Paquete')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('paquete')
export class PaqueteController {
  constructor(private readonly paqueteService: PaqueteService) {}

  @Post()
  @Roles('DEVELOPER')
  @ApiOperation({ summary: 'Crear paquete — Solo DEVELOPER' })
  @ApiResponse({ status: 201, description: 'Paquete creado' })
  @ApiResponse({ status: 400, description: 'Código ya registrado o datos inválidos' })
  @ApiResponse({ status: 404, description: 'Camionero o ciudad no encontrados' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  create(@Body() createPaqueteDto: CreatePaqueteDto) {
    return this.paqueteService.create(createPaqueteDto);
  }

  @Get()
  @Roles('ADMIN', 'DEVELOPER')
  @ApiOperation({ summary: 'Listar todos los paquetes — ADMIN y DEVELOPER' })
  @ApiResponse({ status: 200, description: 'Lista de paquetes' })
  findAll() {
    return this.paqueteService.findAll();
  }

  @Get('camionero/:rfc')
  @Roles('ADMIN', 'DEVELOPER')
  @ApiOperation({ summary: 'Paquetes por camionero — ADMIN y DEVELOPER' })
  @ApiResponse({ status: 200, description: 'Lista de paquetes del camionero' })
  @ApiResponse({ status: 404, description: 'Camionero no encontrado' })
  findByCamionero(@Param('rfc', ParseIntPipe) rfc: number) {
    return this.paqueteService.findByCamionero(rfc);
  }

  @Get('cuidad/:codigo')
  @Roles('ADMIN', 'DEVELOPER')
  @ApiOperation({ summary: 'Paquetes por ciudad — ADMIN y DEVELOPER' })
  @ApiResponse({ status: 200, description: 'Lista de paquetes hacia esa ciudad' })
  @ApiResponse({ status: 404, description: 'Ciudad no encontrada' })
  findByCiudad(@Param('codigo', ParseIntPipe) codigo: number) {
    return this.paqueteService.findByCiudad(codigo);
  }

  @Get(':codigo')
  @Roles('ADMIN', 'DEVELOPER')
  @ApiOperation({ summary: 'Obtener paquete por código — ADMIN y DEVELOPER' })
  @ApiResponse({ status: 200, description: 'Paquete encontrado' })
  @ApiResponse({ status: 404, description: 'Paquete no encontrado' })
  findOne(@Param('codigo', ParseIntPipe) codigo: number) {
    return this.paqueteService.findOne(codigo);
  }

  @Patch(':codigo')
  @Roles('DEVELOPER')
  @ApiOperation({ summary: 'Actualizar paquete — Solo DEVELOPER' })
  @ApiResponse({ status: 200, description: 'Paquete actualizado' })
  @ApiResponse({ status: 404, description: 'Paquete, camionero o ciudad no encontrados' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  update(
    @Param('codigo', ParseIntPipe) codigo: number,
    @Body() updatePaqueteDto: UpdatePaqueteDto,
  ) {
    return this.paqueteService.update(codigo, updatePaqueteDto);
  }

  @Delete(':codigo')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Eliminar paquete — Solo ADMIN' })
  @ApiResponse({ status: 200, description: 'Paquete eliminado' })
  @ApiResponse({ status: 404, description: 'Paquete no encontrado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  remove(@Param('codigo', ParseIntPipe) codigo: number) {
    return this.paqueteService.remove(codigo);
  }
}