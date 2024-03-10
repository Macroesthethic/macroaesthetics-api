import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User} from './user.entity';

export enum DocumentOption {
  AttachFile = 'Adjuntar archivo',
  ProfessionalID = 'Cédula Profesional',
  Skip = 'Omitir por ahora',
}

@Entity('user_details')
export class UserDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('boolean')
  isProfessional?: boolean;

  @Column('text', { nullable: true })
  profession?: string;

  @Column('boolean')
  isProvider?: boolean;

  @Column('text', { nullable: true })
  brandName?: string;

  @Column({
    type: 'enum',
    enum: DocumentOption,
    default: DocumentOption.Skip,
  })
  documentOption?: DocumentOption;

  @OneToOne(()=> User)
  @JoinColumn()
    user: User;

  
}
