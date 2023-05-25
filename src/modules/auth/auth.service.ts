import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async signup(createUserDto: CreateUserDto, cityId: string) {
    // const city = await this.cityRepository.findOne(cityId); // this.cityService.findOne(cityId);
    // if (!city) {
    //   throw new BadRequestException('City not found');
    // }
    // const user = this.userRepository.create(createUserDto); // this.userService.create(createUserDto);
    // user.city = city;
    // return await this.userRepository.save(user);
  }
}
