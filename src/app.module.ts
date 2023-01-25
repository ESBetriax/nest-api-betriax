import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OfferModule } from './offer/offer.module';

//holaa MEN 2
@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-api-betriax'),
    OfferModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
