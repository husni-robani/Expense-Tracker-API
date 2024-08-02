import { Module, ValidationPipe } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { APP_PIPE } from '@nestjs/core';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ExpenseController],
  providers: [
    ExpenseService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  imports: [PrismaModule],
})
export class ExpenseModule {}
