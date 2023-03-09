import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { OfferModule } from './offer/offer.module';
import { CommonModule } from './common/common.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-api-betriax'),
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
    }),
    AdminModule,
    AuthModule,
    OfferModule,
    CommonModule,
    UserModule,
  ],
})
export class AppModule {}
