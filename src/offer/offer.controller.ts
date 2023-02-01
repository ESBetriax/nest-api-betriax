import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { ParseMongoIdPipe } from './../common/pipes/parse-mongo-id.pipe';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offerService.create(createOfferDto);
  }

  @Get()
  findAll() {
    return this.offerService.findAll();
  }

  @Get(':term')
  findOne(@Param('term', ParseMongoIdPipe) id: string) {
    return this.offerService.findOne(id);
  }

  @Patch(':term')
  update(
    @Param('term', ParseMongoIdPipe) term: string,
    @Body() updateOfferDto: UpdateOfferDto,
  ) {
    return this.offerService.update(term, updateOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offerService.remove(+id);
  }
}
