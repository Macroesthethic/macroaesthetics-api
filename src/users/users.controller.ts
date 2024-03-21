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
import { PhoneValidationService } from "./services/phone-validation/phone-validation.service";
import { CreateUserDetailsDto } from "./dto/create-user-details.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly phoneValidationService: PhoneValidationService
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
  async create(@Body() createUserDto: CreateUserDto) {
      const newUser = await this.usersService.create(createUserDto);
      return newUser;
    
  }

  @Post("register/details")
  // @UseInterceptors(FileInterceptor("attachFile"))
  async createDetails(
    // @UploadedFile() file: Express.Multer.File,
    @Body() createUserDetailsDto: CreateUserDetailsDto
  ) {
    // let attachFileUrl = null;
    // if (file) {
    //   attachFileUrl = await this.usersService.uploadFile(file);
    // }
    const newUserDetails = await this.usersService.createDetails(
      createUserDetailsDto,
      // attachFileUrl
    );

    return newUserDetails;
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
