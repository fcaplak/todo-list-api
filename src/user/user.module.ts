import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

/**
 * User module
 * @fileoverview - User module
 * @description - Module for user operations
 */
@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {}
