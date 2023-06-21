import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards, Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Post('signup')
  async signup(@Body() signUpUserDto: SignUpUserDto) {
    return await this.authService.signup(signUpUserDto);
  }

  @Patch('update')
  async update(@Body() updateUserDto: updateUserDto) {
    return await this.authService.update(updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('updateUser')
  async updateUser(@Body() updateUserDto: updateUserDto, @Request() req) {
    const { id } = req.user;
    return await this.authService.updateUser(updateUserDto, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const {email} = req.user;
    return await this.authService.getProfile(email);
  }

}
