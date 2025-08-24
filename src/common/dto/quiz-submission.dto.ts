import {
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { AnswerDto } from './answer.dto';
import { Type } from 'class-transformer';

export class QuizSubmissionDto {
  @ArrayNotEmpty({ message: 'Answers are required.' })
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
