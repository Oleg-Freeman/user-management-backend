import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configService } from './configs';

async function bootstrap() {
  const port = configService.getPort();
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('User Management API')
    .setDescription('API Documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(
    '/api/v1/docs',
    app,
    document,
    configService.getSwaggerConfig(),
  );
  app.useGlobalPipes(new ValidationPipe(configService.getValidationOptions()));

  await app.listen(port, async () =>
    console.log(`Server is running on: ${await app.getUrl()}`),
  );
}
bootstrap();
