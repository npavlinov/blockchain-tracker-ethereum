import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Transaction } from '../entities/transaction.entity';
import { IInfuraTransaction } from '../../common/interfaces/infura-transaction.interface';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepo: EntityRepository<Transaction>,
  ) {}

  public async bulkCreate(
    transactions: IInfuraTransaction[],
    configurationId: number,
  ): Promise<void> {
    const createdTransactions = transactions.map((t) =>
      this.transactionsRepo.create(
        plainToClass(Transaction, { ...t, configurationId }),
      ),
    );
    await this.transactionsRepo.persistAndFlush(createdTransactions);
  }
}
