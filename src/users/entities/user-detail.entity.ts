import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { IsNotEmpty } from "class-validator";

@Entity("user_details")
export class UserDetails {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("bool", { default: false, nullable: false })
  isProfessional?: boolean;

  @Column("bool", { default: false, nullable: false })
  isProvider?: boolean;

  @IsNotEmpty()
  @Column("text")
  role: string;

  @Column("text", { nullable: true })
  companyName?: string;

  @Column("text", { nullable: true })
  giro?: string;

  @Column("text")
  country: string;

  // @Column("text", { nullable: true })
  // attachFile?: string;

  @Column("text", { nullable: true })
  professionalID?: string;

  @Column({
    type: "text",
    default: "skip",
  })
  documentOption?: string;

  @ManyToOne(() => User, (user) => user.details)
  user: User;
}
