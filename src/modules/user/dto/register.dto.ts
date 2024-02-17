import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 'John', description: 'First name' })
  @Matches(NAME_REGEX, { message: NAME_ERROR })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @Matches(NAME_REGEX, { message: NAME_ERROR })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'example@gmail.com', description: 'Email' })
  @Matches(EMAIL_REGEX, { message: EMAIL_ERROR })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Qwerty123.', description: 'Password' })
  @Matches(PASSWORD_REGEX, { message: PASSWORD_ERROR })
  @IsString()
  @IsNotEmpty()
  password: string;
}
