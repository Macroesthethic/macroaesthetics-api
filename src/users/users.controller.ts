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
  Header,
  NotFoundException,
  Res,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags } from "@nestjs/swagger";
import { User } from "./entities/user.entity";
import { AnyFilesInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { CreateUserDto } from "./dto/create-user.dto";
import { of } from "rxjs";
import { join } from "path";
import { readFile } from "fs";


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
        destination: 'uploads',
        filename: (req, file, cb) => {
          cb(null, (file.filename = file.originalname));
        }
      })
    }))
  @Post('register')
  async create(@UploadedFiles() file: Express.Multer.File, @Body() createUserDto) {
    const attachFileUrl = file[0]?.path ?? null;
    const user = await this.usersService.create(createUserDto, attachFileUrl);
    return user;
  }

  @Get('getFile/:id')
  @Header('Content-type', 'application/pdf')
  async getFile(@Param("id") id: string, @Res() res) {
    const file = await this.usersService.getUserById(id);

    if (!file) {
      throw new NotFoundException("User not found");
    }

    const userFileUrl = file.attachFile;
    return of(res.sendFile(join(process.cwd(), userFileUrl)));
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
