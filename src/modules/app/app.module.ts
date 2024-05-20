import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { PostgresModule } from '../common/internal/postgres/postgres.module';
import { TaskModule } from '../tasks/task.module';
import { EventsModule } from '../events/events.module';
// import { EnvConfig } from '@src/modules/common/config/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostgresModule,
    AuthModule,
    TaskModule,
    EventsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
  ],
})
export class AppModule {}
