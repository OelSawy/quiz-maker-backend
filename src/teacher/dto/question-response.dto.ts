import { QuestionType } from '@prisma/client';

export class QuestionResponseDto {
  id: string;
  type: QuestionType;
  question: string;
  options: string[];
  answer: string;
}
