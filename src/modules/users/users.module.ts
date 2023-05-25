import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { CityModule } from '../city/city.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  CityModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
