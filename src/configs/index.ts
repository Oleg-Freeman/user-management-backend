import {
  HttpException,
  HttpStatus,
  ValidationPipeOptions,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

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

  getDbConfig(): DataSourceOptions {
    return {
      type: 'postgres',
      port: parseInt(this.getValue('POSTGRES_PORT')),
      host: this.getValue('POSTGRES_HOST') || 'localhost',
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DB'),
      entities: ['dist/modules/**/*.entity{.ts,.js}'],
      migrations: ['dist/migrations/*.js'],
      migrationsTableName: 'migrations_typeorm',
      migrationsRun: false,
      logging: this.getNodeEnv() !== 'production',
      synchronize: false,
    };
  }
}

const configService = new ConfigService(process.env);

export { configService };
