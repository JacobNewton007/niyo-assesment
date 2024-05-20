import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DALImpl, DAL } from './dal';

@Module({
  imports: [ConfigModule],
  providers: [DALImpl],
  exports: [DALImpl],
})
export class PostgresModule {}
