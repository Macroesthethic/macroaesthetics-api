import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { User } from "@/users/entities/user.entity";
import { JwtStrategy } from "./jwt/jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: process.env.JWT_EXPIRES_IN,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule, JwtStrategy, TypeOrmModule],
})
export class AuthModule {}
