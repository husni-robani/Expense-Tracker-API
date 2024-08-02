import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ResponseExpenseDto {
  id: number;
  amount: string;
  name: string;
  description: string;
  userId: number;
}

export class CreateExpenseDto {
  @IsNotEmpty()
  @Transform(({ value }) => BigInt(value), { toClassOnly: true })
  amount: bigint;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}

export class UpdateExpenseDto {
  @IsOptional()
  @Transform(({ value }) => BigInt(value), { toClassOnly: true })
  amount?: bigint;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class GetExpenseDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  id?: number;

  @IsOptional()
  @Transform(({ value }) => BigInt(value), { toClassOnly: true })
  minAmount?: bigint;

  @IsOptional()
  @Transform(({ value }) => BigInt(value), { toClassOnly: true })
  maxAmount?: bigint;

  @IsOptional()
  @IsString()
  name?: string;
}
