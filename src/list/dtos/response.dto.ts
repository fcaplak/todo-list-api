import { ApiProperty } from '@nestjs/swagger';
import { ItemResponseDto } from 'src/item/dtos/response.dto';
import { UserResponseDto } from 'src/user/dtos/response.dto';

export class CreateListResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: () => UserResponseDto, isArray: true })
  users: UserResponseDto[];
}

export class ListResponseDto extends CreateListResponseDto {
  @ApiProperty({ type: () => ItemResponseDto, isArray: true })
  items: ItemResponseDto[];
}
