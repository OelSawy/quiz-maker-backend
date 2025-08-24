import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AnswerDto {
  @ApiProperty({
    example: 'q1',
    description: 'The unique identifier of the question being answered',
  })
  @IsString()
  @IsNotEmpty({ message: 'Question ID is required.' })
  questionId: string;

  @ApiProperty({
    example: 'Stack',
    description: 'The user’s submitted answer for the question',
  })
  @IsString()
  @IsNotEmpty({ message: 'Answer is required.' })
  answer: string;
}
