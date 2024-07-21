import { ApiProperty } from '@nestjs/swagger';
import { ItemFlag } from '../enums/item-flag.enum';
import { IsEnum } from 'class-validator';
import { UserResponseDto } from 'src/user/dtos/response.dto';

export class ItemResponseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  deadline: Date;

  @ApiProperty({
    enum: ItemFlag,
  })
  @IsEnum(ItemFlag)
  flag: ItemFlag;

  @ApiProperty()
  createdBy: UserResponseDto;
}
