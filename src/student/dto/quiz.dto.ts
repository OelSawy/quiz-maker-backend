import { QuestionDto } from './question.dto';

export class QuizDto {
  id: string;
  title: string;
  teacherName: string;
  questions: QuestionDto;
  year: number;
  startTime: Date;
  durationInMinutes: number;
}
