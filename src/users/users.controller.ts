import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags } from "@nestjs/swagger";
import { User } from "./entities/user.entity";
import { AnyFilesInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { CreateUserDto } from "./dto/create-user.dto";


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

  @UseInterceptors(
    AnyFilesInterceptor({
    storage: diskStorage({
      destination:'uploads',
        filename: (req, file, cb) => {
          cb(null, (file.filename = file.originalname));
        }
    })
  }))
  @Post('register')
  async create(@UploadedFiles() file: Express.Multer.File, @Body() createUserDto) {
   const attachFileUrl = file[0].path
    const user = await this.usersService.create(createUserDto, attachFileUrl);
    return user;
  }

  @Get('getFile/:id')
  async getFile(@Param("id") id:string ){
    const file = await this.usersService.getFile(id);
    return file;
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
