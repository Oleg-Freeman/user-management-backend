import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { configService } from './configs';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [MongooseModule.forRoot(configService.getMongoUrl()), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
