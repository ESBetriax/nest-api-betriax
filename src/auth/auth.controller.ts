import { Controller, Post, Body, Param, Delete } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateAuthDto, LoginAuthDto } from './dto';

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
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
