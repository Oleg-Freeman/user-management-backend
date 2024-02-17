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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from './decorators';
import { LoginDto, RegisterDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import { AuthGuard } from './guards';
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
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User logged in successfully',
    type: User,
  })
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'User logout' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User logged out successfully',
  })
  async logout(@CurrentUser() user: User) {
    return this.userService.logout(user);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne({ _id: id });
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
