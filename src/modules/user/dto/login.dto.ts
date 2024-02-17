import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  WRONG_CREDENTIALS_MESSAGE,
} from '../../../constants';

export class LoginDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'Email' })
  @Matches(EMAIL_REGEX, { message: WRONG_CREDENTIALS_MESSAGE })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Qwerty123.', description: 'Password' })
  @Matches(PASSWORD_REGEX, { message: WRONG_CREDENTIALS_MESSAGE })
  @IsString()
  @IsNotEmpty()
  password: string;
}
