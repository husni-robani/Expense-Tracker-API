import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateExpenseDto,
  GetExpenseDto,
  UpdateExpenseDto,
} from './dto/expense.dto';
import { stringify } from 'querystring';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async createExpense(userId: number, data: CreateExpenseDto) {
    try {
      const newExpense = await this.prisma.expense.create({
        data: {
          amount: data.amount,
          name: data.name,
          description: data.description,
          userId: userId,
        },
      });

      return {
        amount: newExpense.amount.toString(),
        name: newExpense.name,
        description: newExpense.description,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getExpense(expenseId: number, userId: number) {
    try {
      const expense = await this.prisma.expense.findUnique({
        where: {
          id: expenseId,
          userId: userId,
        },
      });

      return {
        amount: expense.amount.toString(),
        name: expense.name,
        description: expense.description,
        userId: expense.userId,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async updateExpense(
    expenseId: number,
    userId: number,
    expenseData: UpdateExpenseDto,
  ) {
    try {
      const updateExpense = await this.prisma.expense.update({
        where: {
          id: expenseId,
          userId: userId,
        },
        data: expenseData,
      });
      return {
        amount: updateExpense.amount.toString(),
        name: updateExpense.name,
        description: updateExpense.description,
        updatedAt: updateExpense.updatedAt,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async deleteExpense(expenseId: number, userId: number) {
    try {
      const deleteExpense = await this.prisma.expense.delete({
        where: {
          id: expenseId,
          userId: userId,
        },
      });

      if (!deleteExpense) throw new UnauthorizedException();

      return {
        message: 'Delete expense successfull!',
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
