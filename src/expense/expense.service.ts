import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateExpenseDto,
  GetExpenseDto,
  ResponseExpenseDto,
  UpdateExpenseDto,
} from './dto/expense.dto';
import { Expense } from '@prisma/client';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async createExpense(
    userId: number,
    data: CreateExpenseDto,
  ): Promise<ResponseExpenseDto> {
    try {
      const newExpense = await this.prisma.expense.create({
        data: {
          amount: data.amount,
          name: data.name,
          description: data.description,
          userId: userId,
        },
      });

      return this.expenseData(newExpense);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getExpense(
    expenseId: number,
    userId: number,
  ): Promise<ResponseExpenseDto> {
    try {
      const expense = await this.prisma.expense.findUnique({
        where: {
          id: expenseId,
          userId: userId,
        },
      });

      return this.expenseData(expense);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async updateExpense(
    expenseId: number,
    userId: number,
    expenseData: UpdateExpenseDto,
  ): Promise<ResponseExpenseDto> {
    try {
      const updateExpense = await this.prisma.expense.update({
        where: {
          id: expenseId,
          userId: userId,
        },
        data: expenseData,
      });
      return this.expenseData(updateExpense);
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

  expenseData(expense: Expense): ResponseExpenseDto {
    return {
      id: expense.id,
      amount: expense.amount.toString(),
      name: expense.name,
      description: expense.description,
      userId: expense.userId,
    };
  }
}
