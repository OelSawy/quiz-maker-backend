import { QuestionType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class QuestionDto {
  @IsEnum(QuestionType, { message: 'Invalid question type.' })
  @IsNotEmpty({ message: 'Question type is required.' })
  type: QuestionType;

  @IsString()
  @IsNotEmpty({ message: 'Question text is required.' })
  question: string;

  @IsString({ each: true })
  @IsOptional()
  options: string[];

  @IsString()
  @IsNotEmpty()
  answer: string;
}
