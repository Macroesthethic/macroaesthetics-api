import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('professions')
export class Profession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;
}