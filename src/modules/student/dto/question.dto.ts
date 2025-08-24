import { QuestionType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class QuestionDto {
  @IsString()
  @IsNotEmpty({ message: "id shouldn't be empty" })
  questionId: string;

  @IsEnum(QuestionType, { message: 'Invalid question type.' })
  @IsNotEmpty({ message: 'Question type is required.' })
  type: QuestionType;

  @IsString()
  @IsNotEmpty({ message: 'Question text is required.' })
  question: string;

  @IsString({ each: true })
  @IsOptional()
  options: string[];
}
