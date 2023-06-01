import {Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne} from 'typeorm';
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

    @ManyToOne(() => City)
    city: City;
    
    validatePassword(password: string): boolean {
        return this.password === password;
    }

    getInfotoPayload() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            city: this.city
        }
    }
}
