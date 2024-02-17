import { IsNotEmpty, IsString, Matches } from 'class-validator';
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  WRONG_CREDENTIALS_MESSAGE,
} from '../../../constants';

export class LoginDto {
  @Matches(EMAIL_REGEX, { message: WRONG_CREDENTIALS_MESSAGE })
  @IsString()
  @IsNotEmpty()
  email: string;

  @Matches(PASSWORD_REGEX, { message: WRONG_CREDENTIALS_MESSAGE })
  @IsString()
  @IsNotEmpty()
  password: string;
}
