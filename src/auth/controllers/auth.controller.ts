import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserDto } from '../../user/dtos/user.dto';
import { SignInResponseDto, SignUpResponseDto } from '../dtos/response.dto';

import { Public } from '../strategies/public.strategy';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiResponse({
    status: 200,
    description: 'Logged in successfully',
    type: SignInResponseDto,
  })
  signIn(@Body() user: UserDto): Promise<SignInResponseDto> {
    return this.authService.signIn(user);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @ApiOperation({ summary: 'User register' })
  @ApiResponse({
    status: 201,
    description: 'Account created successfully',
    type: SignUpResponseDto,
  })
  signUp(@Body() user: UserDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(user);
  }
}
