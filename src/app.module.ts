import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { configService } from './configs';

@Module({
  imports: [MongooseModule.forRoot(configService.getMongoUrl())],
  controllers: [],
  providers: [],
})
export class AppModule {}
