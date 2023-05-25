import {Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany} from 'typeorm';
import { City } from './city.entity';
import { Sector } from './sector.entity';
@Entity({
    name: 'institution'
})
export class Institution {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToOne(() => City)
    city: City;

    @OneToMany(() => Sector, sector=> sector.institution)
    sectors: Sector[];


}