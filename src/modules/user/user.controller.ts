import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import { ExcludeUserPasswordInterceptor } from './interceptors';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ExcludeUserPasswordInterceptor)
  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New user registered successfully',
    type: User,
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @UseInterceptors(ExcludeUserPasswordInterceptor)
  @ApiOperation({ summary: 'User login' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User logged in successfully',
    type: User,
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Get('logout')
  async logout(@Body() createUserDto: RegisterDto) {
    return this.userService.register(createUserDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
