import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { hashPassword, comparePassword } from 'src/utils/bcrypt.util';
import { IJwtResponse } from 'src/auth/interfaces/response.interface';
import { IUserCredentials } from 'src/user/interfaces/user.interface';
import { IUserResponse } from 'src/user/interfaces/response.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: IUserCredentials): Promise<IJwtResponse> {
    try {
      const user = await this.userService.findOne(email, [
        'id',
        'email',
        'password',
      ]);
      await comparePassword(password, user.password);

      const accessToken = await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
      });

      return { access_token: accessToken };
    } catch {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async signUp(payload: IUserCredentials): Promise<IUserResponse> {
    const existingUser = await this.userService.findOneByEmail(payload.email);
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }
    payload.password = await hashPassword(payload.password);
    const user = await this.userService.create(payload);
    return user;
  }
}
