import { ItemFlag } from '../enums/item-flag.enum';
import { UserEntity } from 'src/user/entities/user.entity';

export interface IUpdateItemFlag {
  itemId: string;
  flag: ItemFlag;
  user: UserEntity;
}
