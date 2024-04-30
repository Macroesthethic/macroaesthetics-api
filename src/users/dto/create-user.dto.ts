import { Transform } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @IsNotEmpty()
  @IsString()
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

  @IsOptional()
  isProfessional?: boolean;

  @IsString()
  @IsOptional()
  professionName?: string;

  @IsString()
  @IsOptional()
  otherProfession?: string;

  @IsOptional()
  isProvider?: boolean;

  @IsString()
  @IsOptional()
  otherProvider?: string;

  @IsString()
  role: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  giro?: string;

  @IsOptional()
  isEstheticMedicine?: boolean;

  @IsOptional()
  isEstheticBeauty?: boolean;

  @IsOptional()
  otherProfessionDirect?: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsNumber()
  @IsOptional()
  professionalID?: number;


  @IsOptional()
  isFileUpload: boolean;

  created_at: Date;
}
