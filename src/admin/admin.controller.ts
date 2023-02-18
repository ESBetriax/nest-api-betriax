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

import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { QueryPipe } from './pipes/query.pipe';

import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';

import { UpdateUserDto } from './../user/dto/update-user.dto';
import { EntityDto } from './../offer/dto/entity.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  // @Get()
  // async findAll(@Query('entity', QueryPipe) entity: string) {
  //   return await this.adminService.findAll(entity);
  // }

  @Get()
  async findAll(@Query() paginationDto: EntityDto) {
    return await this.adminService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':term')
  update(
    @Param('term', ParseMongoIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.adminService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
