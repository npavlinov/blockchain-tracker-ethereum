import {
  Column,
  Model,
  Table,
  AllowNull,
  IsNumeric,
  HasMany,
} from 'sequelize-typescript';
import { Transaction } from '../../infura/entities/transaction.model';

/**
 * Configuration for filtering transactions, can be extended with more fields
 * */
@Table
export class Configuration extends Model {
  @AllowNull
  @Column
  fromAddress?: string;

  @AllowNull
  @Column
  toAddress?: string;

  /**
   *  Value to be filtered by in ethereum
   *  Any transaction larger than or equal this value would be added
   * */
  @IsNumeric
  @AllowNull
  @Column
  value?: number;

  @AllowNull
  @Column
  hash?: string;

  @AllowNull
  @Column
  age?: Date;

  @HasMany(() => Transaction)
  transactions: Transaction[];
}
