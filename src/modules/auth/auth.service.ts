import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { User } from 'src/entities';
import { JwtService } from '@nestjs/jwt';
import { CityService } from '../city/city.service';
import { SignUpUserDto } from './dto/signup-user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>,
    private userService: UsersService,
    private cityService: CityService,
    private jwtService: JwtService
    ) { }
  
  async login(loginUserDto: LoginUserDto) {
    const {email, password} = loginUserDto;
    const user = await this.userService.findOne(email);
    if (!user){
      throw new Error('User not found');
    }
    if (!user.validatePassword(password)){
      throw new Error('Password is incorrect');
    }

    const token = this.getToken(user);

    return {
      user,
      token
    }
  }


  getToken(user: User){
    const payload = user.getInfotoPayload();
    return this.jwtService.sign(payload)
  }

  async signup(signUpUserDto: SignUpUserDto) {
    const {cityId, ...createUserDto} = signUpUserDto;
    const city = await this.cityService.findOne(cityId); // this.cityService.findOne(cityId);
    if (!city) {
      throw new BadRequestException('City not found');
    }
    const user = await this.userService.create(createUserDto); // this.userService.create(createUserDto);
    user.city = city;
    return await this.userService.save(user);
  }
}
