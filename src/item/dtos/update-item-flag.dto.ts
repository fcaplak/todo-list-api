import { IsEnum } from 'class-validator';
import { ItemFlag } from '../enums/item-flag.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateItemFlagDto {
  @ApiProperty({
    enum: ItemFlag,
  })
  @IsEnum(ItemFlag)
  flag: ItemFlag;
}
