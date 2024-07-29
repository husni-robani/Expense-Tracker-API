import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto, SignupDto } from './dto/auth.dto';
import { User } from '@prisma/client';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(data: SignupDto) {
    try {
      const hashed_password = await argon.hash(data.password);

      const user: User = await this.prisma.user.create({
        data: {
          username: data.username,
          email: data.email,
          password: hashed_password,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('Email or username already exist');
      }
      throw error;
    }
  }

  async signin(data: SigninDto) {
    // check is user exist, if not throw exception
    const user: User | null = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials Taken!');

    // check is password match, if not throw exception
    const isValid: boolean = await argon.verify(user.password, data.password);
    if (!isValid) throw new ForbiddenException('Credentials Taken!');

    // return user
    return user;
  }
}
