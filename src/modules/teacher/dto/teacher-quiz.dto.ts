import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TeacherQuestionDto } from './teacher-question.dto';

export class TeacherQuizDto {
  @ApiProperty({
    example: 'Data Structures Final Exam',
    description: 'Title of the quiz',
  })
  @IsString()
  @IsNotEmpty({ message: 'Title is required.' })
  title: string;

  @ApiProperty({
    type: [TeacherQuestionDto],
    description: 'List of questions in the quiz',
  })
  @IsArray()
  @IsNotEmpty({ message: 'Questions are required.' })
  questions: TeacherQuestionDto[];

  @ApiProperty({
    example: '2025-06-01T09:00:00.000Z',
    description: 'Start time of the quiz in ISO 8601 format',
  })
  @IsDate()
  @IsNotEmpty({ message: 'Start time is required.' })
  startTime: Date;

  @ApiProperty({
    example: 90,
    description: 'Duration of the quiz in minutes',
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Duration is required.' })
  durationInMinutes: number;

  @ApiProperty({
    example: 2025,
    description: 'Academic year the quiz belongs to',
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Year is required.' })
  year: number;
}
