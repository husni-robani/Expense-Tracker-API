import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(username: string) {
    const user: User | null = await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    delete user.password;
    return user;
  }

  async deleteUser(id: number) {
    const deleteUser = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });

    if (!deleteUser) {
      throw new NotFoundException();
    }

    return {
      message: 'user deleted successfully',
    };
  }
}
