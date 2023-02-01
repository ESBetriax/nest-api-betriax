import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { QueryPipe } from './pipes/query.pipe';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  async findAll(@Query('entity', QueryPipe) entity: string) {
    if (entity == 'enzo') {
      return 'quiero un sindicato';
    } else {
      return await this.adminService.findAll();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.adminService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
