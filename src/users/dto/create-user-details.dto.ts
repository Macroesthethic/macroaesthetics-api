import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
  Validate,
} from "class-validator";
import { Express } from "express";

export class CreateUserDetailsDto {
  @IsString()
  role: string;

  @IsString()
  @IsOptional()
  companyName?: string;
  
  @IsString()
  @IsOptional()
  giro?: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  // @IsOptional()
  // @Validate(
  //   (value: Express.Multer.File) => value.mimetype === "application/pdf",
  //   {
  //     message: "Invalid file type",
  //   }
  // )
  // attachFile?: Express.Multer.File;

  @IsString()
  @IsOptional()
  professionalID?: string;

  @IsString()
  @IsOptional()
  documentOption?: string;

  @IsUUID()
  @IsNotEmpty()
  user: string;
}
