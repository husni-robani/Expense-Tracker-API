import { Module, ValidationPipe } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { APP_PIPE } from '@nestjs/core';

@Module({
  controllers: [ExpenseController],
  providers: [
    ExpenseService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class ExpenseModule {}
