import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async validate(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async update(updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: updateUserDto.email },
      relations: ['city'],
    });
    if (user) {
      user.name = updateUserDto.name;
      user.email = updateUserDto.email;
      user.password = updateUserDto.password;
      return await this.userRepository.update(user.id, user);
    }
    return null;
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async save(user: User) {
    return await this.userRepository.save(user);
  }
}
