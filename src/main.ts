import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { GeneralUtil } from './modules/common/utils/general.utils';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { connectDB } from './modules/common/config/db';
import  helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);


  // Ensure that all required environment variables are set.
  const { success, message } = GeneralUtil.ensureAllEnvironmentVariablesAreSet(configService);
  if (!success) {
    // eslint-disable-next-line no-console
    // console.log(message);
    process.exit(1);
  }

  // Enable CORS for all requests.
  app.enableCors({
    origin: configService.get('CORS_ALLOWED_ORIGINS'),
  });


  // Enable security headers.
  app.use(helmet());

    // Ensure that all incoming requests are validated against the DTOs.
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
      whitelist: true, // Strip out any properties that are not defined in the DTO.
    }),
  );

  // Enable versioning of the API.
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

    // Create the OPENAPI documentation. See https://docs.nestjs.com/openapi/introduction
    const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('NIYO API')
    .setDescription('The NIYO REST API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await connectDB();
  app.listen(configService.get('PORT'));

}
bootstrap();

