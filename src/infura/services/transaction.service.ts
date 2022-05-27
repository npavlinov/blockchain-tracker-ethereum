import { Injectable } from '@nestjs/common';
import { Transaction } from '../entities/transaction.model';
import { IInfuraTransaction } from '../../common/interfaces/infura-transaction.interface';
import { InjectModel } from '@nestjs/sequelize';
import { convertFromWeiHexToEth } from '../../common/utils/helpers';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction)
    private readonly transactionModel: typeof Transaction,
  ) {}

  public async bulkCreate(
    transactions: IInfuraTransaction[],
    configurationId: number,
  ): Promise<void> {
    transactions.map((t) => {
      return this.transactionModel.create({
        ...t,
        configurationId,
        value: convertFromWeiHexToEth(t.value),
      });
    });
  }
}
