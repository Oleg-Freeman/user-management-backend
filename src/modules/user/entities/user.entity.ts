import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import {
  BaseSwaggerResponse,
  EMAIL_ERROR,
  EMAIL_REGEX,
  NAME_ERROR,
  NAME_REGEX,
  PASSWORD_ERROR,
  PASSWORD_REGEX,
} from '../../../constants';

export type CatDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User extends BaseSwaggerResponse {
  @ApiProperty({ example: 'John', description: 'First name' })
  @Prop({ required: true, trim: true, match: [NAME_REGEX, NAME_ERROR] })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @Prop({ required: true, trim: true, match: [NAME_REGEX, NAME_ERROR] })
  lastName: string;

  @ApiProperty({ example: 'exaple@gail.com', description: 'Email' })
  @Prop({
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    match: [EMAIL_REGEX, EMAIL_ERROR],
  })
  email: string;

  @Prop({ required: true, trim: true, match: [PASSWORD_REGEX, PASSWORD_ERROR] })
  password: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    description: 'Token',
    required: false,
  })
  @Prop({ required: false, trim: true })
  token?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export class UserResponse extends OmitType(User, ['password', 'token']) {}
