import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  HttpCode,
  Req,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ListService } from '../services/list.service';
import { CreateListDto } from '../dtos/create-list.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserEntity } from 'src/user/entities/user.entity';
import { Public } from 'src/auth/strategies/public.strategy';
import { UUID } from 'crypto';
import { CreateItemDto } from 'src/item/dtos/create-item.dto';
import { ShareListDto } from 'src/list/dtos/share-list.dto';
import { ItemService } from 'src/item/services/item.service';
import { ItemResponseDto } from 'src/item/dtos/response.dto';
import { CreateListResponseDto, ListResponseDto } from '../dtos/response.dto';

@ApiTags('List')
@Controller('lists')
export class ListController {
  constructor(
    private readonly listService: ListService,
    private readonly itemService: ItemService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a new todo list' })
  @ApiResponse({
    status: 201,
    description: 'List created successfully',
    type: CreateListResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async createList(
    @Body() createListDto: CreateListDto,
    @Req() req: Request,
  ): Promise<CreateListResponseDto> {
    const user = req.user as UserEntity;
    return this.listService.createList({ ...createListDto, user });
  }

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Returns lists with items' })
  @ApiResponse({
    status: 200,
    description: 'Returned list',
    type: ListResponseDto,
    isArray: true,
  })
  async getLists(): Promise<ListResponseDto[]> {
    return this.listService.getLists();
  }

  @Public()
  @Get(':listId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Returns specific list with items' })
  @ApiResponse({
    status: 200,
    description: 'Returned list',
    type: ListResponseDto,
  })
  async getList(
    @Param('listId', ParseUUIDPipe) listId: UUID,
  ): Promise<ListResponseDto> {
    return this.listService.getList(listId);
  }

  @UseGuards(AuthGuard)
  @Post(':listId/items')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Creates a new item in list' })
  @ApiResponse({
    status: 201,
    description: 'Created item',
    type: ItemResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async createItem(
    @Param('listId', ParseUUIDPipe) listId: UUID,
    @Body() createItemDto: CreateItemDto,
    @Req() req: Request,
  ): Promise<ItemResponseDto> {
    const user = req.user as UserEntity;
    return this.itemService.createItem({ listId, ...createItemDto, user });
  }

  @UseGuards(AuthGuard)
  @Patch(':listId/share')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Shares todo list with another user' })
  @ApiResponse({
    status: 200,
    description: 'Shared list successfully',
    type: ListResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async shareList(
    @Param('listId', ParseUUIDPipe) listId: UUID,
    @Body() shareListDto: ShareListDto,
    @Req() req: Request,
  ): Promise<ListResponseDto> {
    const user = req.user as UserEntity;
    return this.listService.shareList({ listId, ...shareListDto, user });
  }
}
