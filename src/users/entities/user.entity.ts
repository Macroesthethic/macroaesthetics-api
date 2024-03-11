import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserDetails } from './user-detail.entity';
import { Profession } from './professions.entity';
import { Providers } from './providers.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  lastname: string;

  @Column('text')
  phone: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column('bool', {
    default: true,
  })
  is_active: boolean;

  @Column('text')
  role: string;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  // @OneToOne(() => UserDetails, (userDetails) => userDetails.user)
  // details: UserDetails;

  // @ManyToMany(() => Profession)
  // @JoinTable()
  // professions: Profession[];

  // @ManyToMany(() => Profession)
  // @JoinTable()
  // providers: Providers[];
}
