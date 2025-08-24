import { ArrayNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AnswerDto } from './answer.dto';
import { Type } from 'class-transformer';

export class QuizSubmissionDto {
  @ApiProperty({
    type: [AnswerDto],
    description: 'List of answers submitted for the quiz',
    example: [
      { questionId: 'q1', answer: 'Stack' },
      { questionId: 'q2', answer: 'O(n)' },
    ],
  })
  @ArrayNotEmpty({ message: 'Answers are required.' })
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
