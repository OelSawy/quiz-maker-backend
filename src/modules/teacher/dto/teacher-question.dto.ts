import { QuestionType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TeacherQuestionDto {
  @ApiProperty({
    enum: QuestionType,
    example: QuestionType.MULTIPLE_CHOICE,
    description: 'Type of the question (from QuestionType enum)',
  })
  @IsEnum(QuestionType, { message: 'Invalid question type.' })
  @IsNotEmpty({ message: 'Question type is required.' })
  type: QuestionType;

  @ApiProperty({
    example: 'Which data structure uses LIFO (Last In First Out)?',
    description: 'The text of the question',
  })
  @IsString()
  @IsNotEmpty({ message: 'Question text is required.' })
  question: string;

  @ApiProperty({
    example: ['Queue', 'Stack', 'Linked List', 'Array'],
    description:
      'Available options for the question (only for multiple choice)',
    type: [String],
    required: false,
  })
  @IsString({ each: true })
  @IsOptional()
  options: string[];

  @ApiProperty({
    example: 'Stack',
    description: 'The correct answer to the question',
  })
  @IsString()
  @IsNotEmpty({ message: 'Answer is required.' })
  answer: string;
}
