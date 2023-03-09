import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { CreateAuthDto, LoginAuthDto } from './dto';
import { Get } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  async login(
    @Body() createLoginDto: LoginAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, cookie } = await this.authService.login(createLoginDto);

    res.setHeader('Set-Cookie', [cookie]);
    return user;
    // @Headers('Set-Cookie', `Authorization=${cookie}`)
    // const setCookie(@Res() response: Response): Response {
    //   response.cookie('rememberme', '1') // Using express res object.
    //   return response.send('Cookie has been set! :)')
    // }
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  @Get('prueba')
  @UseGuards(AuthGuard())
  testunPrivateRoutes() {
    return {
      ok: true,
      message: 'Hi there',
    };
  }
}
