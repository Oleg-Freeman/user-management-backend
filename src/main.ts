import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './configs';

async function bootstrap() {
  const port = configService.getPort();
  const app = await NestFactory.create(AppModule);

  app
    .setGlobalPrefix('/api/v1')
    .useGlobalPipes(new ValidationPipe(configService.getValidationOptions()));

  await app.listen(port, async () =>
    console.log(`Server is running on: ${await app.getUrl()}`),
  );
}
bootstrap();
