import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { configService } from './configs';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const nodeEnv = configService.getNodeEnv();

        if (nodeEnv === 'test') {
          const mongod = await MongoMemoryServer.create();

          return {
            uri: mongod.getUri(),
          };
        }

        return {
          uri: configService.getMongoUrl(),
        };
      },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
