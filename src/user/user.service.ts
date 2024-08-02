import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(user: {
    id: number;
    createdAt: object;
    updatedAt: object;
    username: string;
    email: string;
  }) {
    return user;
  }

  async deleteMe(id: number) {
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
