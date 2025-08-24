import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { QuizDto } from './dto';
import type { Request } from 'express';
import { JwtStrategy } from 'src/auth/strategy';
import { AuthGuard } from '@nestjs/passport';

@Controller('teacher')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly jwt: JwtStrategy,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('quiz')
  async createQuiz(@Body() quizDto: QuizDto, @Req() req: Request) {
    const { role, userId } = req.user as { role: string; userId: string };

    if (role !== 'TEACHER') {
      throw new ForbiddenException({ message: 'Insufficient Rols' });
    }

    return this.teacherService.createQuiz(quizDto, userId);
  }
}
