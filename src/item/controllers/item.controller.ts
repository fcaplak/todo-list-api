import {
  Controller,
  HttpStatus,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Get,
  UseGuards,
  Patch,
  Body,
  Req,
} from '@nestjs/common';
import { ItemService } from 'src/item/services/item.service';
import { Public } from 'src/auth/strategies/public.strategy';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request } from 'express';
import { UserEntity } from 'src/user/entities/user.entity';
import { ItemResponseDto } from 'src/item/dtos/response.dto';
import { UpdateItemFlagDto } from 'src/item/dtos/update-item-flag.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Item')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Public()
  @Get(':itemId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Returns specific item' })
  @ApiResponse({
    status: 200,
    description: 'Returned item',
    type: ItemResponseDto,
  })
  async getItem(
    @Param('itemId', ParseUUIDPipe) itemId: string,
  ): Promise<ItemResponseDto> {
    return this.itemService.getItem(itemId);
  }

  @UseGuards(AuthGuard)
  @Patch(':itemId/flag')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Updates item flag' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiResponse({
    status: 200,
    description: 'Item flag updated successfully',
    type: ItemResponseDto,
  })
  async updateFlag(
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @Body() updateItemFlag: UpdateItemFlagDto,
    @Req() req: Request,
  ): Promise<ItemResponseDto> {
    const user = req.user as UserEntity;
    return this.itemService.updateItemFlag({ itemId, ...updateItemFlag, user });
  }
}
