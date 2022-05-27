import { IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  readonly blockHash: string;

  @IsString()
  readonly blockNumber: string;

  @IsString()
  readonly from: string;

  @IsString()
  readonly gas: string;

  @IsString()
  readonly gasPrice: string;

  @IsString()
  readonly hash: string;

  @IsString()
  readonly input: string;

  @IsString()
  readonly nonce: string;

  @IsString()
  readonly r: string;

  @IsString()
  readonly s: string;

  @IsString()
  readonly to: string;

  @IsString()
  readonly transactionIndex: string;

  @IsString()
  readonly type: string;

  @IsString()
  readonly v: string;

  @IsString()
  readonly value: string;

  @IsNumber()
  configurationId: number;
}
