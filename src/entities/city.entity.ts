import {Entity,Column, PrimaryGeneratedColumn, OneToMany, In} from 'typeorm';
import { User } from './user.entity';
import { Institution } from './institution.entity';

@Entity({
    name: 'city'
})
export class City {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(
        () => User, (user) => user.city
    )
    users: User[];

    @OneToMany(
        () => Institution, (institution) => institution.city
    )
    institutions: Institution[];

}