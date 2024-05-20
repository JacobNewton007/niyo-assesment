import DALFactory, { DAL} from '../internal/postgres/dal';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Deasyncify from 'deasyncify';
import * as process from 'process';
import { configDotenv } from 'dotenv';
configDotenv();





export const dAL = DALFactory({
  databaseUrl: process.env.DEVELOPMENT_DATABASE_URL
});

let retry = 3
export async function connectDB(): Promise<DAL> {
  const logger = new Logger(connectDB.name);

  const [, err] = await Deasyncify.watch(dAL.connect());

  if (err != null) {
    logger.error(err);
    if (retry > 0) {
      logger.log(`Error connecting to database, retrying... (${retry} left)`);
      retry -= 1;
      await new Promise((resolve) => setTimeout(resolve, 2 * 1_000));
      await connectDB();
    }

    process.exit(1);
  }

  logger.log('Database connected');
  return dAL;
  
}