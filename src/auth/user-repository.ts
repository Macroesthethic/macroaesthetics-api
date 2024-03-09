import { User } from "@/users/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";

export class UserRepository extends Repository<User> {   
}