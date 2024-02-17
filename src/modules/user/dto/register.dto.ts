import { IsNotEmpty, IsString, Matches } from 'class-validator';
import {
  EMAIL_ERROR,
  EMAIL_REGEX,
  NAME_ERROR,
  NAME_REGEX,
  PASSWORD_ERROR,
  PASSWORD_REGEX,
} from '../../../constants';

export class RegisterDto {
  @Matches(NAME_REGEX, { message: NAME_ERROR })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Matches(NAME_REGEX, { message: NAME_ERROR })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Matches(EMAIL_REGEX, { message: EMAIL_ERROR })
  @IsString()
  @IsNotEmpty()
  email: string;

  @Matches(PASSWORD_REGEX, { message: PASSWORD_ERROR })
  @IsString()
  @IsNotEmpty()
  password: string;
}
