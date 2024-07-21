import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateListDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
