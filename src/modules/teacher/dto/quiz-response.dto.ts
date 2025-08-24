import { ApiProperty } from '@nestjs/swagger';
import { QuestionResponseDto } from './question-response.dto';

export class QuizResponseDto {
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
    example: '2025-06-01T09:00:00.000Z',
    description: 'Start time of the quiz in ISO 8601 format',
  })
  startTime: Date;

  @ApiProperty({
    example: 90,
    description: 'Duration of the quiz in minutes',
  })
  durationInMinutes: number;

  @ApiProperty({
    example: 2025,
    description: 'Academic year for which the quiz is assigned',
  })
  year: number;

  @ApiProperty({
    type: [QuestionResponseDto],
    description: 'List of questions included in the quiz',
  })
  questions: QuestionResponseDto[];

  @ApiProperty({
    example: '2025-05-20T08:30:00.000Z',
    description: 'Timestamp when the quiz was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-05-21T14:15:00.000Z',
    description: 'Timestamp when the quiz was last updated',
  })
  updatedAt: Date;
}
