import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  imports: [JwtModule.register({})],
  providers: [TeacherService, JwtStrategy],
  controllers: [TeacherController],
})
export class TeacherModule {}
