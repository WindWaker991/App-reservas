import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { User } from 'src/entities';
import { JwtService } from '@nestjs/jwt';
import { SignUpUserDto } from './dto/signup-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { BcryptService } from './bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
  ) { }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userService.validate(email, password);
    if (!user) {
      throw new Error('User not found');
    }

    const token = this.getToken(user);

    return {
      token,
    };
  }

  getToken(user: User) {
    const payload = user.getInfotoPayload();
    return this.jwtService.sign(payload);
  }

  async signup(signUpUserDto: SignUpUserDto) {
    const { ...createUserDto } = signUpUserDto;
    const user = await this.userService.create(createUserDto);
    return await this.userService.save(user);
  }

  async update(updateUserDto: updateUserDto) {
    const { ...updateUser } = updateUserDto;
    const user = await this.userService.update(updateUser);
    return user;
  }

  async getProfile(email: string) {
    try {
      const user = await this.userService.findOne(email);
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async validate(payload: any) {
    const { email } = payload;
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return user;
  }

  async updateUser(updateUserDto: updateUserDto, id: string) {
    const { ...updateUser } = updateUserDto;
    const user = await this.userService.updateUser(updateUser, id);
    return user;
  }
}
