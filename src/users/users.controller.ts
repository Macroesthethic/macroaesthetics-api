import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags } from "@nestjs/swagger";
import { User } from "./entities/user.entity";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  async getAllUsers(): Promise<User[]> {
    const users = await this.usersService.getAllUsers();
    return users;
  }

  @Get(":id")
  async getUserById(@Param("id") id: string): Promise<User> {
    const users = await this.usersService.getUserById(id);
    return users;
  }

  @Post("register")
  @UseInterceptors(FileInterceptor("attachFile"))
  async create
    (@UploadedFile() attachFile: Express.Multer.File,
      @Body() createUserDto: CreateUserDto) {

    let attachFileUrl = null;
    if (attachFile) {
      attachFileUrl = await this.usersService.uploadFile(attachFile);
    }
    const newUser = await this.usersService.create(createUserDto, attachFileUrl);
    return newUser;
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
