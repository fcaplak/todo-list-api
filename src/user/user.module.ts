import { Module } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

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
