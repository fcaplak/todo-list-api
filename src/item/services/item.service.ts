import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { ItemEntity } from '../entities/item.entity';
import { ListEntity } from 'src/list/entities/list.entity';
import { IUpdateItemFlag } from 'src/item/interfaces/update-item-flag.interface';
import { IItemResponse } from '../interfaces/response.interface';
import { ICreateItem } from '../interfaces/create-item.interface';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
    @InjectRepository(ListEntity)
    private listRepository: Repository<ListEntity>,
  ) {}

  async createItem({
    listId,
    user,
    ...newItem
  }: ICreateItem): Promise<IItemResponse> {
    const item = this.itemRepository.create(newItem);
    try {
      const list = await this.listRepository.findOneOrFail({
        where: { id: listId },
        relations: ['users'],
      });

      const hasUserPermission = list.users.some(
        (listUser) => listUser.id === user.id,
      );
      if (!hasUserPermission) {
        throw new ForbiddenException(
          'User has no permission to create items in list',
        );
      }

      return this.itemRepository.save({ ...item, list: list, createdBy: user });
    } catch (error) {
      if (error instanceof EntityNotFoundError)
        throw new NotFoundException('List not found');
      throw error;
    }
  }

  async getItem(itemId: string): Promise<IItemResponse> {
    try {
      return await this.itemRepository.findOneOrFail({
        where: { id: itemId },
        relations: ['createdBy', 'list'],
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError)
        throw new NotFoundException('Item not found');
      throw error;
    }
  }

  async updateItemFlag({
    itemId,
    flag,
    user,
  }: IUpdateItemFlag): Promise<IItemResponse> {
    try {
      const item = await this.itemRepository.findOneOrFail({
        where: { id: itemId },
        relations: ['createdBy', 'list', 'list.users'],
      });

      const isUserAssociated = item.list.users.some(
        (listUser) => listUser.id === user.id,
      );

      if (!isUserAssociated) {
        throw new ForbiddenException(
          'User has no permission to update items of this list',
        );
      }

      item.flag = flag;
      return await this.itemRepository.save(item);
    } catch (error) {
      if (error instanceof EntityNotFoundError)
        throw new NotFoundException('Item not found');
      throw error;
    }
  }
}
