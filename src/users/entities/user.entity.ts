import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  lastname: string;

  @Column('bigint')
  phone: number;

  @Column('text')
  countryCode: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column("bool", { default: false, nullable: false })
  isProfessional?: boolean;

  @Column("text", { nullable: true })
  professionName?: string;

  @Column("text", { nullable: true })
  otherProfession?: string;

  @Column("bool", { default: false, nullable: false })
  isProvider?: boolean;

  @Column("text", { nullable: true })
  otherProvider?: string;

  @IsNotEmpty()
  @Column("text")
  role: string;

  @Column("text", { nullable: true })
  companyName?: string;

  @Column("text", { nullable: true })
  giro?: string;

  @Column("bool", { default: false, nullable: true })
  isEstheticMedicine?: boolean;
  
  @Column("bool", { default: false, nullable: true })
  isEstheticBeauty?: boolean;

  @Column("text", { nullable: true })
  otherProfessionDirect?: string;

  @Column("text")
  country: string;

  @Column("text")
  region: string;

  @Column("text", { nullable: true })
  attachFile?: string;

  @Column("bigint", { nullable: true })
  professionalID?: number;

  @Column({ type: "bool", default: false, nullable: false})
  isFileUpload?: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column('bool', {
    default: true,
  })
  is_active: boolean;

}
