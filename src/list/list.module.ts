import { Module } from '@nestjs/common';
import { ListService } from './services/list.service';
import { ListController } from './controllers/list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListEntity } from './entities/list.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from 'src/user/services/user.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { ItemService } from 'src/item/services/item.service';
import { ItemEntity } from 'src/item/entities/item.entity';

/**
 * List module
 * @fileoverview - List module
 * @description - Module for todo-lists operations
 */
@Module({
  providers: [ListService, JwtService, UserService, ItemService],
  controllers: [ListController],
  imports: [
    TypeOrmModule.forFeature([ItemEntity, ListEntity, UserEntity]),
    AuthModule,
  ],
})
export class ListModule {}
