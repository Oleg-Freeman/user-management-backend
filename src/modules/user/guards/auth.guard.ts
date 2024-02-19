// noinspection ExceptionCaughtLocallyJS

import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UNAUTHORIZED_ERROR } from '../../../constants';
import { UserService } from '../user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      if (!req?.headers?.authorization) {
        throw new UnauthorizedException(UNAUTHORIZED_ERROR);
      }
      const [bearer, token] = req.headers.authorization.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException(UNAUTHORIZED_ERROR);
      }

      const { id } = this.jwtService.verify(token);

      if (!id) {
        throw new UnauthorizedException(UNAUTHORIZED_ERROR);
      }

      const user = await this.userService.findOne({ _id: id });

      if (!user || !user.token || token !== user.token) {
        throw new UnauthorizedException(UNAUTHORIZED_ERROR);
      }

      req.user = user;

      return true;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
