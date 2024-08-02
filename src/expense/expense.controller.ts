import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ExpenseService } from './expense.service';
import {
  CreateExpenseDto,
  GetExpenseDto,
  UpdateExpenseDto,
} from './dto/expense.dto';

@Controller('api/expenses')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @UseGuards(AuthGuard)
  @Post()
  createExpense(@Body() data: CreateExpenseDto, @Request() req) {
    console.log('create expense controller');
    return this.expenseService.createExpense(req.user.id, data);
  }

  @UseGuards(AuthGuard)
  @Get(':expenseId')
  getExpense(
    @Param('expenseId', ParseIntPipe) expenseId: number,
    @Request() req,
  ) {
    return this.expenseService.getExpense(expenseId, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Patch(':expenseId')
  updateExpense(
    @Param('expenseId', ParseIntPipe) expenseId: number,
    @Body() expenseData: UpdateExpenseDto,
    @Request() req,
  ) {
    return this.expenseService.updateExpense(
      expenseId,
      req.user.id,
      expenseData,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':expenseId')
  deleteExpense(
    @Param('expenseId', ParseIntPipe) expenseId: number,
    @Request() req,
  ) {
    return this.expenseService.deleteExpense(expenseId, req.user.id);
  }
}
