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

  async create(createUserDto:CreateUserDto , attachFileUrl: string | null) {
    const { password } = createUserDto;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user: DeepPartial<User> = {
      ...createUserDto,
      password: hashedPassword,
      attachFile: attachFileUrl,
    };

    try {
      await this.usersRepository.save(user);
      delete user.password;
      return HttpStatus.CREATED;
    } catch (e) {
      return this.handleDBError(e);
    }
  }

  async getFile(id: string):Promise<Buffer> {
    const user = await this.getUserById(id);
    if(!user) {
      throw new NotFoundException("User not found");
    }

    const userFileUrl = user.attachFile;
    const file = path.join(__dirname, '..', '..', userFileUrl);

    if(!fs.existsSync(file)) {
      throw new NotFoundException("File not found");
    }

    const fileBuffer = fs.readFileSync(file);
    return fileBuffer;
  }

  private handleDBError(error: any) {
    if (error.code === "23505")
      throw new ConflictException("User already exists");
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
