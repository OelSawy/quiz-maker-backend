import { ForbiddenException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { Role } from '@prisma/client';
import { RegisterResponseDto } from './dto/register-response.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerDto: RegisterDto): Promise<RegisterResponseDto> {
    const hashedPassword = await argon.hash(registerDto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: registerDto.email,
          firstName: registerDto.firstName,
          lastName: registerDto.lastName,
          password: hashedPassword,
          role: registerDto.role,
          year: registerDto.role == Role.STUDENT ? registerDto.year : null,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          year: true,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('User with this email already exists');
      }
      throw new Error('Registration failed');
    }
  }
}
