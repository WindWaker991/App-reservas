import {Entity,Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({
    name: 'city'
})
export class City {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

}