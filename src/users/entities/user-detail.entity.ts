import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { IsNotEmpty } from "class-validator";

@Entity("user_details")
export class UserDetails {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsNotEmpty()
  @Column("text")
  role: string;

  @Column("text", { nullable: true })
  companyName?: string;

  @Column("text", { nullable: true })
  giro?: string;

  @Column("text")
  country: string;

  @Column({
    type: "text",
    default: "skip",
  })
  documentOption?: string;

  @Column("text", { nullable: true })
  attachFile?: string;

  @Column("text", { nullable: true })
  professionalID?: string;

  @OneToOne(() => User, (user) => user.details)
  @IsNotEmpty()
  user: User;
}
