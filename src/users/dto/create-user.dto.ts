import {
  IsEmail,
  IsISO31661Alpha2,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

 @IsPhoneNumber()
 @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsISO31661Alpha2()
  countryCode: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "The password must contain at least one uppercase letter, one lowercase letter, one number or special character, and be at least 6 characters long.",
  })
  password: string;

  created_at: Date;
}
