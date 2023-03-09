import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { ParseMongoIdPipe } from './../common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from './../common/dto/pagination.dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from './../auth/decorators/role-protected/auth.decorator';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  @Auth()
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offerService.create(createOfferDto);
  }
  @Get()
  @Auth('PERSON')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.offerService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term', ParseMongoIdPipe) id: string) {
    return this.offerService.findOne(id);
  }

  @Patch(':term')
  @Auth()
  update(
    @Param('term', ParseMongoIdPipe) term: string,
    @Body() updateOfferDto: UpdateOfferDto,
  ) {
    return this.offerService.update(term, updateOfferDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.offerService.remove(+id);
  }
}
