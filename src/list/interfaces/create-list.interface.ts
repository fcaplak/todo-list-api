import { UserEntity } from 'src/user/entities/user.entity';

export interface ICreateList {
  name: string;
  user: UserEntity;
}
