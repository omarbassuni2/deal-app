import { Module } from '@nestjs/common';
import { AuthorizationGuard } from './authorization.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
})
export class AuthenticationModule {}
