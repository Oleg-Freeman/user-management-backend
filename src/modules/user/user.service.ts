import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EMAIL_EXISTS_ERROR, MongooseModelNames } from '../../constants';
import { LoginDto, RegisterDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(MongooseModelNames.USER)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  private async getHashedPassword(password: string) {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  async register(data: RegisterDto) {
    const { email, password } = data;

    let user = await this.userModel.findOne({ email });

    if (user) {
      throw new ConflictException(EMAIL_EXISTS_ERROR);
    }

    const hashedPassword = await this.getHashedPassword(password);

    user = await this.userModel.create({
      ...data,
      password: hashedPassword,
    });

    const token = await this.jwtService.signAsync({ id: user.id });

    user = await this.userModel.findByIdAndUpdate(
      user.id,
      { token },
      { new: true },
    );

    return user;
  }

  async login(loginDto: LoginDto) {
    console.log(loginDto);
    return 'This action adds a new user';
  }

  async logout(createUserDto: RegisterDto) {
    console.log(createUserDto);
    return 'This action adds a new user';
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
