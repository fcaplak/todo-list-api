import { ItemEntity } from 'src/item/entities/item.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export interface IListResponse {
  id: string;
  name: string;
  users: UserEntity[];
  items: ItemEntity[];
}
export interface ICreateListResponse {
  id: string;
  name: string;
  users: UserEntity[];
}
