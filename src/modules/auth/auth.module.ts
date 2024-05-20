import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { AuthGuard } from './guards/auth.guard';
import { AuthServiceImpl } from './services';
import { AuthRepositoryImpl } from './repositories';
import { AuthController } from './controller';
import { dAL } from '../common/config/db';
import { DALImpl } from '../common/internal/postgres/dal';

/**
 * The AuthModule is responsible for handling authentication and authorization.
 */
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '3600s',
        },
        global: true,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    DALImpl,
    AuthServiceImpl,
    AuthRepositoryImpl,
  ],
  controllers: [AuthController],
  exports: [AuthModule],
})
export class AuthModule {}
