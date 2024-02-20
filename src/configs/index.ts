import {
  HttpException,
  HttpStatus,
  ValidationPipeOptions,
} from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env' : '.env.local',
});

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];

    if (!value && throwOnMissing) {
      throw new HttpException(
        `validation:error. config error - missing env.${key}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return value;
  }

  getPort(): number {
    return +this.getValue('PORT', false) || 3000;
  }

  getNodeEnv(): string {
    return this.getValue('NODE_ENV', false) || 'development';
  }

  getValidationOptions(transform: boolean = true): ValidationPipeOptions {
    const options: ValidationPipeOptions = {
      whitelist: true,
      forbidNonWhitelisted: true,
    };

    if (transform) {
      return {
        ...options,
        stopAtFirstError: false,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
          exposeDefaultValues: true,
        },
      };
    }

    return options;
  }

  getMongoUrl(): string {
    const mongoUrl = this.getValue('MONGO_URL', false);

    if (mongoUrl) {
      return mongoUrl;
    }

    const mongoHost = this.getValue('MONGO_HOST', false);

    return `mongodb://${mongoHost || 'localhost'}:27017`;
  }

  getJwtSecret(): string {
    return this.getValue('JWT_SECRET');
  }

  getJwtExpiresIn(): string {
    return this.getValue('JWT_EXPIRES_IN');
  }

  getSwaggerConfig() {
    return {
      customSiteTitle: 'User Management API',
      customfavIcon:
        'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
      customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
      ],
      customCssUrl: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
      ],
    };
  }
}

const configService = new ConfigService(process.env);

export { configService };
