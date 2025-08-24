import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuizDto } from './dto';

@Injectable()
export class TeacherService {
  constructor(private readonly prisma: PrismaService) {}

  async createQuiz(quizDto: QuizDto, teacherId: string) {
    const teacher = await this.prisma.user.findUnique({
      where: { id: teacherId },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    const { questions, ...rest } = quizDto;

    const quiz = await this.prisma.quiz.create({
      data: {
        ...rest,
        questions: {
          create: questions.map((q) => ({
            type: q.type,
            question: q.question,
            options: q.options || [],
            answer: q.answer,
          })),
        },
        teacherId,
      },
    });

    return quiz;
  }
}
