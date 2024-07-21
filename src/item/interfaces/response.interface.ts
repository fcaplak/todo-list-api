import { ItemFlag } from '../enums/item-flag.enum';
import { UserEntity } from 'src/user/entities/user.entity';

export interface IItemResponse {
  title: string;
  text: string;
  deadline: Date;
  flag: ItemFlag;
  createdBy: UserEntity;
}
