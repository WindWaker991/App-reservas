import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { BcryptService } from '../auth/bcrypt.service';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private bcryptService: BcryptService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    user.password = await this.bcryptService.encriptarContrasena(user.password);
    return await this.userRepository.save(user);
  }

  async validate(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await this.bcryptService.verificarContrasena(password, user.password))) {
      return user;
    }
    return null;
  }

  async update(updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: updateUserDto.email },
    });
    if (user) {
      user.name = updateUserDto.name;
      user.email = updateUserDto.email;
      user.password = await this.bcryptService.encriptarContrasena(updateUserDto.password);
      user.city = updateUserDto.city;
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
