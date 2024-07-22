import { ItemFlag } from 'src/item/enums/item-flag.enum';
import { UserEntity } from 'src/user/entities/user.entity';

export interface ICreateItem {
  listId: string;
  title: string;
  text: string;
  deadline: Date;
  flag?: ItemFlag;
  user: UserEntity;
}
