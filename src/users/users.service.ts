import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async getAllUsers() {
    const users = await this.usersRepository.find();
    return users;
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id: id },
    });

    if (user) {
      return user;
    }
    throw new NotFoundException("Could not find any user");
  }

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;

    
    const hashedPassword =bcrypt.hashSync(password, 10);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    try {
      await this.usersRepository.save(user);
      delete user.password;
      return user;
    } catch (e) {
      return this.handleDBError(e);
    }
  }

  private handleDBError(error: any) {
    if (error.code === "23505") {
      throw new ConflictException("User already exists");
    }
    throw new Error("Something went wrong");
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
