import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class StudentQuestionDto {
  @ApiProperty({
    example: '63fafd93-b782-45eb-86af-de3b4034c483',
    description: 'Question id',
  })
  @IsString()
  @IsNotEmpty({ message: "id shouldn't be empty" })
  questionId: string;

  @ApiProperty({
    example: 'MULTIPLE_CHOICE',
    description: 'Question type',
  })
  @IsEnum(QuestionType, { message: 'Invalid question type.' })
  @IsNotEmpty({ message: 'Question type is required.' })
  type: QuestionType;

  @ApiProperty({
    example: 'Which of the following is NOT a JavaScript data type?',
    description: 'Question',
  })
  @IsString()
  @IsNotEmpty({ message: 'Question text is required.' })
  question: string;

  @ApiProperty({
    example: ['String', 'Number', 'Boolean', 'Character'],
    description: 'Options for mcq question',
  })
  @IsString({ each: true })
  @IsOptional()
  options: string[];
}
