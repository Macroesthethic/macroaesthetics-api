import { HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "./dto/login-auth.dto";
import { UsersService } from "@/users/users.service";
import { Repository } from "typeorm";
import { User } from "@/users/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { JwtPayload } from "./interfaces/jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async validateUser(email: string, password: string): Promise<any> {}

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email: email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    if (!user) throw new UnauthorizedException("Invalid credentials");

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException("Invalid credentials");

    return {
      status: HttpStatus.OK,
      message: "User logged in successfully",  
      token: this.generateToken({ email: user.email, id: user.id }),
    };
  }

  private generateToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
