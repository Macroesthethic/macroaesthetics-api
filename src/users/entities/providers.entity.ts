import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('providers')
export class Providers {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;
}   