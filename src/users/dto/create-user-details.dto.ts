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
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsOptional()
  documentOption?: string;

  @IsOptional()
  @Validate(
    (value: Express.Multer.File) => value.mimetype === "application/pdf",
    {
      message: "Invalid file type",
    }
  )
  attachFile?: Express.Multer.File;

  @IsString()
  @IsOptional()
  professionalID?: string;

  @IsUUID()
  @IsNotEmpty()
  user: string;
}
