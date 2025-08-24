import { QuestionResponseDto } from "./question-response.dto";

export class QuizResponseDto {
  id: string;
  title: string;
  startTime: Date;
  durationInMinutes: number;
  year: number;
  questions: QuestionResponseDto[];
  createdAt: Date;
  updatedAt: Date;
}
