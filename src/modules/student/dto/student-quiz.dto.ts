import { ApiProperty } from '@nestjs/swagger';
import { StudentQuestionDto } from './student-question.dto';

export class StudentQuizDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the quiz',
  })
  id: string;

  @ApiProperty({
    example: 'Data Structures Final Exam',
    description: 'Title of the quiz',
  })
  title: string;

  @ApiProperty({
    example: 'Dr. John Smith',
    description: 'Name of the teacher who created the quiz',
  })
  teacherName: string;

  @ApiProperty({
    type: [StudentQuestionDto],
    description: 'List of questions in the quiz',
  })
  questions: StudentQuestionDto[];

  @ApiProperty({
    example: 2025,
    description: 'Academic year for which the quiz is assigned',
  })
  year: number;

  @ApiProperty({
    example: '2025-06-01T09:00:00.000Z',
    description: 'Start time of the quiz in ISO format',
  })
  startTime: Date;

  @ApiProperty({
    example: 90,
    description: 'Duration of the quiz in minutes',
  })
  durationInMinutes: number;
}
