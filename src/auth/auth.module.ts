import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [PrismaModule],
  providers: [AuthService],
})
export class AuthModule {}
