import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class RegisterResponseDto {
  @ApiProperty({
      type: UserDto
    })
    user: UserDto
}
