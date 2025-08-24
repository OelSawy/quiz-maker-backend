import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { QuizSubmissionDto } from '../../common/dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async getQuizzes(year: number) {
    const quizzes = await this.prisma.quiz.findMany({
      where: { year },
      include: {
        questions: true,
      },
    });

    const result = await Promise.all(
      quizzes.map(async (quiz) => {
        const teacher = await this.prisma.user.findUnique({
          where: { id: quiz.teacherId },
        });

        return {
          title: quiz.title,
          id: quiz.id,
          teacherName: teacher?.firstName + ' ' + teacher?.lastName,
          questions: await Promise.all(
            quiz.questions.map((question) => {
              return {
                questionId: question.id,
                questionType: question.type,
                question: question.question,
                options: question.options,
              };
            }),
          ),
          year: quiz.year,
          startTime: quiz.startTime,
          durationInMinutes: quiz.durationInMinutes,
        };
      }),
    );

    return result;
  }

  async submitQuiz(
    quizSubmissionDto: QuizSubmissionDto,
    studentId: string,
    year: number,
    quizId: string,
  ) {
    const quiz = await this.prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz id not found');
    }

    if (quiz.year !== year) {
      throw new ForbiddenException('You are not allowed to take this quiz');
    }

    try {
      await this.prisma.quiz.update({
        where: {
          id: quizId,
        },
        data: {
          submissions: {
            create: [
              {
                userId: studentId,
                answers: await Promise.all(
                  quizSubmissionDto.answers.map((answer) => {
                    return {
                      questionId: answer.questionId,
                      answer: answer.answer,
                    };
                  }),
                ),
              },
            ],
          },
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('You already submitted this quiz');
        }
      }
    }

    return { message: 'Quiz submitted' };
  }
}
