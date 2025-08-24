import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherQuizDto } from './dto';
import type { Request } from 'express';
import { JwtStrategy } from 'src/modules/auth/strategy';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';

@Controller('teacher')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly jwt: JwtStrategy,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('quiz')
  async createQuiz(@Body() quizDto: TeacherQuizDto, @Req() req: Request) {
    const { role, userId } = req.user as { role: string; userId: string };

    if (role !== 'TEACHER') {
      throw new ForbiddenException({ message: 'Insufficient Role' });
    }

    return this.teacherService.createQuiz(quizDto, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('quiz')
  @ApiResponse({ status: 200, type: TeacherQuizDto })
  @HttpCode(200)
  async getMyQuizzes(@Req() req: Request) {
    const { role, userId } = req.user as { role: string; userId: string };

    if (role !== 'TEACHER') {
      throw new ForbiddenException({ message: 'Insufficient Role' });
    }

    return this.teacherService.getMyQuizzes(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('quiz/:quizId')
  @ApiResponse({
    status: 200,
    example: { message: 'Quiz deleted successfully' },
  })
  async deleteQuiz(@Param('quizId') quizId: string, @Req() req: Request) {
    const { role, userId } = req.user as { role: string; userId: string };

    if (role !== 'TEACHER') {
      throw new ForbiddenException({ message: 'Insufficient Role' });
    }

    return this.teacherService.deleteQuiz(userId, quizId);
  }
}
