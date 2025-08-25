import { ForbiddenException, Injectable } from '@nestjs/common';
import {
  LoginDto,
  LoginResponseDto,
  RegisterDto,
  RegisterResponseDto,
  UserDto,
} from './dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import * as argon from 'argon2';
import { Role } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

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

      return { user } as RegisterResponseDto;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('User with this email already exists');
        }
      }
      throw new Error('Registration failed');
    }
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        password: true,
        year: true,
        role: true,
      },
    });

    if (!user) {
      throw new ForbiddenException('Invalid email or password');
    }

    const isPasswordValid = await argon.verify(
      user.password,
      loginDto.password,
    );
    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid email or password');
    }

    const { password, ...safeUser } = user;

    const jwtToken = await this.signToken(safeUser as UserDto);

    return { access_token: jwtToken, user: safeUser} as LoginResponseDto;
  }

  signToken(user: UserDto): Promise<string> {
    const payload = {
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      year: user.year ?? null,
    };
    return this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: this.config.get('JWT_SECRET'),
      algorithm: this.config.get('JWT_ALGORITHM'),
    });
  }

  async logout(token: string) {
    await this.prisma.blacklistedToken.create({
      data: {
        token,
      },
    });
    return { message: 'Logged out successfully' };
  }
}
