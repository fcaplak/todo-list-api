import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
  @ApiProperty()
  access_token: string;
}

export class SignUpResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;
}
