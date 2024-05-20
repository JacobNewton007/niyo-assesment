import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }


/**
 * Health check for the API
 * @returns
 */
  getHealthCheck(): object {
    return {
      status: '200',
      message: 'Niyo API is running',
    };
  }



}
