import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
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
import { PaginationDto } from './dto/pagination.dto';
import { User, UserResponse } from './entities/user.entity';
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

  @UseGuards(AuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find all users' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users array',
    type: [UserResponse],
  })
  async findAll(@Query() query: PaginationDto) {
    return this.userService.findAll(query);
  }

  @UseInterceptors(ExcludeUserPasswordInterceptor)
  @UseGuards(AuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current logged in user' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Requested user',
    type: User,
  })
  async findOne(@CurrentUser() user: User) {
    return user;
  }

  @UseInterceptors(ExcludeUserPasswordInterceptor)
  @UseGuards(AuthGuard)
  @Patch()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current user' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated user',
    type: User,
  })
  async update(@CurrentUser() user: User, @Body() body: UpdateUserDto) {
    return this.userService.update(user, body);
  }

  @UseGuards(AuthGuard)
  @Delete()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current user' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User deleted successfully',
  })
  async remove(@CurrentUser() user: User) {
    return this.userService.remove(user._id);
  }
}
