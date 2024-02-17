import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  EMAIL_ERROR,
  EMAIL_REGEX,
  NAME_ERROR,
  NAME_REGEX,
  PASSWORD_ERROR,
  PASSWORD_REGEX,
} from '../../../constants';

export type CatDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true, match: [NAME_REGEX, NAME_ERROR] })
  firstName: string;

  @Prop({ required: true, trim: true, match: [NAME_REGEX, NAME_ERROR] })
  lastName: string;

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

  @Prop({ required: false, trim: true })
  token?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
