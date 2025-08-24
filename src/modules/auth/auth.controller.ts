import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  RegisterDto,
  LoginDto,
  RegisterResponseDto,
  LoginResponseDto,
} from './dto';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, type: RegisterResponseDto })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const loginResponse = await this.authService.login(loginDto);

    res.cookie('access_token', loginResponse.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return {
      message: 'Login successful',
      ...loginResponse,
    };
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  async logout(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies?.access_token;

    if (token) {
      const response = await this.authService.logout(token);

      res.clearCookie('access_token', {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
      });

      return res.json(response);
    } else {
      throw new UnauthorizedException('No token found');
    }
  }
}
