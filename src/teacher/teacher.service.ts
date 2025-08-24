import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuizDto, QuizResponseDto } from './dto';

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

  async getMyQuizzes(teacherId: string) {
    const quizzes = await this.prisma.quiz.findMany({
      where: { teacherId },
      include: {
        questions: true,
      },
    });

    return quizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      startTime: quiz.startTime,
      durationInMinutes: quiz.durationInMinutes,
      year: quiz.year,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
      questions: quiz.questions.map((q) => ({
        id: q.id,
        type: q.type,
        question: q.question,
        options: q.options,
        answer: q.answer,
      })),
    }));
  }

  async deleteQuiz(teacherId: string, quizId: string) {
    const teacher = await this.prisma.user.findUnique({
      where: { id: teacherId },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    if (quiz.teacherId !== teacherId) {
      throw new ForbiddenException('You are not allowed to delete this quiz');
    }

    await this.prisma.quiz.delete({
      where: { id: quizId },
    });

    return { message: 'Quiz deleted successfully' };
  }
}
