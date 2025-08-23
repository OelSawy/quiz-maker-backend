import { Role } from '@prisma/client';

export class UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  year?: number;
}
