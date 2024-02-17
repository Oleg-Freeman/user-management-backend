import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  EMAIL_EXISTS_ERROR,
  MongooseModelNames,
  WRONG_CREDENTIALS_MESSAGE,
} from '../../constants';
import { LoginDto, RegisterDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import { compare, genSalt, hash } from 'bcryptjs';

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

  async login(data: LoginDto) {
    const { email, password } = data;

    let user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException(WRONG_CREDENTIALS_MESSAGE);
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException(WRONG_CREDENTIALS_MESSAGE);
    }

    const token = await this.jwtService.signAsync({ id: user.id });

    user = await this.userModel.findByIdAndUpdate(
      user.id,
      { token },
      { new: true },
    );

    return user;
  }

  async logout(user: User) {
    await this.userModel.findByIdAndUpdate(user._id, { token: null });
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(query: FilterQuery<User>) {
    return this.userModel.findOne(query);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
