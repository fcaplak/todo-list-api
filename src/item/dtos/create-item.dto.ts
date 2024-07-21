import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { ItemFlag } from '../enums/item-flag.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  deadline: Date;

  @ApiPropertyOptional({
    enum: ItemFlag,
  })
  @IsOptional()
  @IsEnum(ItemFlag)
  flag?: ItemFlag;
}
