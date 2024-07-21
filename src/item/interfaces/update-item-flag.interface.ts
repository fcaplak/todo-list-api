import { ItemFlag } from '../enums/item-flag.enum';
import { UUID } from 'crypto';
import { UserEntity } from 'src/user/entities/user.entity';

export interface IUpdateItemFlag {
  itemId: UUID;
  flag: ItemFlag;
  user: UserEntity;
}
