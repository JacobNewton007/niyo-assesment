import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @SkipAuth()
  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }


/**
 * Health check endpoint for the API
 * @returns
*/
  @SkipAuth()
  @Get('/health-check')
  getHealthCheck(): object {
    return this.appService.getHealthCheck();
  }
}
