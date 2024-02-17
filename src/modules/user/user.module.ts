import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { configService } from '../../configs';
import { MongooseModelNames } from '../../constants';
import { UserSchema } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongooseModelNames.USER, schema: UserSchema },
    ]),
    JwtModule.register({
      secret: configService.getJwtSecret(),
      signOptions: { expiresIn: configService.getJwtExpiresIn() },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
