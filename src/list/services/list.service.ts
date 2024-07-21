import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListEntity } from '../entities/list.entity';
import { UUID } from 'crypto';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { UserService } from 'src/user/services/user.service';
import {
  ICreateListResponse,
  IListResponse,
} from '../interfaces/response.interface';
import { ICreateList } from '../interfaces/create-list.interface';
import { IShareList } from '../interfaces/share-list.interface';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(ListEntity)
    private listRepository: Repository<ListEntity>,
    private userService: UserService,
  ) {}

  async createList({ name, user }: ICreateList): Promise<ICreateListResponse> {
    const list = this.listRepository.create({ name });
    return this.listRepository.save({ ...list, users: [user] });
  }

  async getLists(): Promise<IListResponse[]> {
    return await this.listRepository.find({
      relations: ['users', 'items'],
    });
  }

  async getList(listId: UUID): Promise<IListResponse> {
    try {
      return await this.listRepository.findOneOrFail({
        where: { id: listId },
        relations: ['users', 'items'],
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError)
        throw new NotFoundException('List not found');
      throw error;
    }
  }

  async shareList({
    listId,
    collaboratorId,
    user,
  }: IShareList): Promise<IListResponse> {
    const [list, collaborator] = await Promise.all([
      this.listRepository.findOne({
        where: { id: listId },
        relations: ['users'],
      }),
      this.userService.findOneBy(collaboratorId),
    ]);

    if (!list) {
      throw new NotFoundException('List not found');
    }
    if (!collaborator) {
      throw new NotFoundException('Collaborator not found');
    }

    if (!list.users.some((listUser) => listUser.id === user.id)) {
      throw new ForbiddenException('User has no permission to share list');
    }

    if (list.users.some((listUser) => listUser.id === collaboratorId)) {
      throw new ConflictException('Collaborator is already in the list');
    }

    list.users.push(collaborator);
    return this.listRepository.save(list);
  }
}
