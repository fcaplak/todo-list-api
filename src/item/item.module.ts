import { Module } from '@nestjs/common';
import { ItemService } from 'src/item/services/item.service';
import { ItemController } from 'src/item/controllers/item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from 'src/item/entities/item.entity';
import { JwtService } from '@nestjs/jwt';
import { ListEntity } from 'src/list/entities/list.entity';
import { UserService } from 'src/user/services/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from 'src/user/entities/user.entity';

/**
 * Item module
 * @fileoverview - Item module
 * @description - Module for todo-list items operations
 */
@Module({
  providers: [ItemService, JwtService, UserService],
  controllers: [ItemController],
  imports: [
    TypeOrmModule.forFeature([ItemEntity, UserEntity, ListEntity]),
    AuthModule,
  ],
})
export class ItemModule {}
