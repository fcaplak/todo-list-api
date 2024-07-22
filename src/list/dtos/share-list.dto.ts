import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ShareListDto {
  @ApiProperty()
  @IsUUID()
  collaboratorId: string;
}
