import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { DeepPartial, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

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

  async create(createUserDto: CreateUserDto, attachFileUrl: string | null) {
    try {

      const { password, } = createUserDto;
      const hashedPassword = bcrypt.hashSync(password, 10);

      const user = this.usersRepository.create({
        ...createUserDto,
        password: hashedPassword,
        attachFile: attachFileUrl,
        is_active: attachFileUrl ? false : true,

      });

      await this.usersRepository.save(user);
      return HttpStatus.CREATED;

    } catch (error) {
      return this.handleDBError(error);
    }
  }

  private handleDBError(error: any) {
    if (error.code === "23505")
      throw new ConflictException("User already exists");
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.getUserById(id);

    if (!user) throw new NotFoundException("User not found");

    await this.usersRepository.save({
      ...user,
      ...updateUserDto,
    });

    return {
      status: HttpStatus.OK,
      message: "User updated successfully",
    };

  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
