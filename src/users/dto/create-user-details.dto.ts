import { IsString } from "class-validator";




export class CreateUserDetailsDto {


    @IsString()
    role: string;

    @IsString()
    companyName?: string;

    @IsString({ each: true })
    documentOption?: string[];

    user: string;

}