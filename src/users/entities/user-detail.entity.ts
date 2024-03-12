import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { IsIn } from "class-validator";

export enum DocumentOption {
  AttachFile = "Adjuntar archivo",
  ProfessionalID = "Cédula Profesional",
  Skip = "Omitir por ahora",
}

@Entity("user_details")
export class UserDetails {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  role: string;

  @Column("text", { nullable: true })
  companyName?: string;

  @Column({
    type: "simple-array",
    default: DocumentOption.Skip,
  })
  @IsIn(
    [
      DocumentOption.AttachFile,
      DocumentOption.ProfessionalID,
      DocumentOption.Skip,
    ],
    { each: true }
  )
  documentOption?: DocumentOption[];

  @Column("bytea", { nullable: true })
  attachFile?: Buffer;

  @Column("bytea", { nullable: true })
  professionalID?: Buffer;

  @OneToOne(() => User, (user) => user.details)
  user: User;
}
