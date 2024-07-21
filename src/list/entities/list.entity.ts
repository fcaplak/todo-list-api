import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { ItemEntity } from '../../item/entities/item.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('list')
export class ListEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => ItemEntity, (item) => item.list)
  items: ItemEntity[];

  @ManyToMany(() => UserEntity, (user) => user.lists)
  users: UserEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
