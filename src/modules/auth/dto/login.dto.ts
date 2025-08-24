import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email is invalid.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(8, {
    message: 'Password is too short. Minimum length is 8 characters.',
  })
  password: string;
}
