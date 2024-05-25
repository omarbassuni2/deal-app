import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV_CONSTANTS } from './lib/constant';
import { AuthenticationModule } from './authentication/authentication.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthorizationGuard } from './authorization/authorization.guard';
import { AdsModule } from './ads/ads.module';
import { RequestsModule } from './requests/requests.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(ENV_CONSTANTS.DB_URI),
        dbName: configService.get<string>(ENV_CONSTANTS.DB_NAME),
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(ENV_CONSTANTS.JWT_SECRET),
        signOptions: { expiresIn: '1y' },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthenticationModule,
    AuthorizationGuard,
    AdsModule,
    RequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
