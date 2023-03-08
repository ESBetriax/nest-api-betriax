import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { CreateAuthDto, LoginAuthDto } from './dto';
import { Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() createLoginDto: LoginAuthDto) {
    return this.authService.login(createLoginDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  @Get('prueba')
  @UseGuards(AuthGuard())
  testunPrivateRoutes(){
    return {
      ok:true,
      message: 'Hi there'
    }
  }
}
