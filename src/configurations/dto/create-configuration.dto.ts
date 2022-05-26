import { IsDate, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateConfigurationDto {
  @IsString()
  @MaxLength(42)
  readonly fromAddress: string;

  @IsString()
  @MaxLength(42)
  readonly toAddress: string;

  @IsNumber()
  readonly value: number;

  @IsString()
  @MaxLength(66)
  readonly hash: string;

  @IsDate()
  readonly age: Date;
}
