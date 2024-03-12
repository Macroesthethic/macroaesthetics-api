import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags } from "@nestjs/swagger";
import { User } from "./entities/user.entity";
import { PhoneValidationService } from "./services/phone-validation/phone-validation.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly phoneValidationService: PhoneValidationService
  ) {}

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
    const { phone, countryCode } = createUserDto;
    const isValid = this.phoneValidationService.validateNumber(
      phone,
      countryCode
    );
    if (!isValid) {
      throw new BadRequestException("Invalid phone number");
    } else {
      const newUser = await this.usersService.create(createUserDto);
      return newUser;
    }
  }

  @Post('register/details')
  async createDetails(@Body() createUserDetailsDto: CreateUserDto) {
  
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
