import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { ItemModule } from './item/item.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, ListModule, ItemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
