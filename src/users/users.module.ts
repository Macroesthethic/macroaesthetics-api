import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Type } from 'class-transformer';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneValidationService } from './services/phone-validation/phone-validation.service';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([User]),
  ],

  
  controllers: [UsersController],
  providers: [UsersService, PhoneValidationService],
})
export class UsersModule {}
