import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AnswerDto } from './answer.dto';
import { Type } from 'class-transformer';

export class QuizSubmissionDto {
  @IsString()
  @IsNotEmpty({ message: 'Quiz ID is required.' })
  quizId: string;

  @ArrayNotEmpty({ message: 'Answers are required.' })
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
