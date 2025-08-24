import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { JwtStrategy } from 'src/modules/auth/strategy';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { QuizSubmissionDto } from 'src/common/dto';

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly jwt: JwtStrategy,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('quiz')
  async getQuizzes(@Req() req: Request) {
    const { role, year } = req.user as { role: string; year: number };

    if (role !== 'STUDENT') {
      throw new ForbiddenException({ message: 'Insufficient Role' });
    }

    return this.studentService.getQuizzes(year);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('quiz/:quizId/submit')
  @HttpCode(200)
  async submitQuiz(@Param('quizId') quizId: string, @Req() req: Request, @Body() quizSubmissionDto: QuizSubmissionDto) {
    const { role, userId, year } = req.user as { role: string; userId: string; year: number };

    if (role !== 'STUDENT') {
      throw new ForbiddenException({ message: 'Insufficient Role' });
    }

    return this.studentService.submitQuiz(quizSubmissionDto, userId, year, quizId);
  }
}
