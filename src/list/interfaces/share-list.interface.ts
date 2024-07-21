import { UserEntity } from 'src/user/entities/user.entity';

export interface IShareList {
  listId: string;
  collaboratorId: string;
  user: UserEntity;
}
