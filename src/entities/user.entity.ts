import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from 'typeorm';
import { City } from './city.entity';
@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToOne(() => City)
    city: City;

}
