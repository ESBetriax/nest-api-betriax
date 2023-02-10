import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { User } from 'src/user/entities/user.entity';
import { JwtPayload } from './../interfaces/jwt-payload.interface';
import { UnauthorizedException } from '@nestjs/common/exceptions';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly configeService: ConfigService,
  ) {
    super({
      secretOrKey: configeService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;

    const user = await this.userModel.findOne({ email });

    if (!user) throw new UnauthorizedException('Invalid token.');

    if (!user.isActive)
      throw new UnauthorizedException('Your account is not currently active.');

    return user;
  }
}
