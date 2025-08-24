import { IsNotEmpty, IsString } from 'class-validator';

export class AnswerDto {
  @IsString()
  @IsNotEmpty({ message: 'Question ID is required.' })
  questionId: string;

  @IsString()
  @IsNotEmpty({ message: 'Answer is required.' })
  answer: string;
}
