import { UserDetails } from "../entities/user-detail.entity";

export class CreateUserDto {

    name: string;
    lastname: string;
    phone: string;
    email: string;
    country: string;
    password: string;
    is_active: boolean;
    details: UserDetails;
    professions?: string[];
    providers?: string[];
    created_at: Date;

}
