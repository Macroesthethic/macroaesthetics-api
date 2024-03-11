import {
  IsEmail,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { UserDetails } from "../entities/user-detail.entity";

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsNumber()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.",
  })
  password: string;

  details?: UserDetails[];

  created_at: Date;
}
