import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { QuestionDto } from './question.dto';

export class QuizDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required.' })
  title: string;

  @IsNotEmpty({ message: 'Questions are required.' })
  questions: QuestionDto[];

  @IsDate()
  @IsNotEmpty({ message: 'Start time is required.' })
  startTime: Date;

  @IsNumber()
  @IsNotEmpty({ message: 'Duration is required.' })
  durationInMinutes: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Year is required.' })
  year: number;
}
