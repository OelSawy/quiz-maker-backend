import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserDto {
  @ApiProperty({
    example: '318094b3-a3a6-4df9-84ed-c75960aeccbe',
    description: 'User id',
  })
  id: string;

  @ApiProperty({
    example: 'example@domain.com',
    description: 'User email',
  })
  email: string;

  @ApiProperty({
    example: 'John',
    description: 'User first name',
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User last name',
  })
  lastName: string;

  @ApiProperty({
    example: 'STUDENT',
    description: 'User role',
  })
  role: Role;

  @ApiProperty({
    example: 4,
    description: 'User year of study [If student]',
  })
  year?: number;

  @ApiProperty({
    example: "quiz4",
    "description" : "submitted quiz id"
  })
  quizSubmissions: string[] = []
}
