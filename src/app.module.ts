import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ListModule } from 'src/list/list.module';
import { ItemModule } from 'src/item/item.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, ListModule, ItemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
