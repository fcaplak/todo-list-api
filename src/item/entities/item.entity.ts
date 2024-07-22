import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ListEntity } from 'src/list/entities/list.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ItemFlag } from 'src/item/enums/item-flag.enum';

@Entity('item')
export class ItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column({ type: 'timestamptz', nullable: true })
  deadline: Date;

  @Column({
    type: 'enum',
    enum: ItemFlag,
    default: ItemFlag.ACTIVE,
  })
  flag: ItemFlag;

  @ManyToOne(() => UserEntity)
  createdBy: UserEntity;

  @ManyToOne(() => ListEntity, (list) => list.items)
  list: ListEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
