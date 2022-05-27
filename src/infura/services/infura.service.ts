import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import * as WebSocket from 'ws';
import { ConfigurationsService } from '../../configurations/configuration.service';
import { Configuration } from '../../configurations/entities/configuration.entity';
import * as constants from '../../common/constants';
import { map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { OnEvent } from '@nestjs/event-emitter';
import { IInfuraTransaction } from '../../common/interfaces/infura-transaction.interface';
import { validateTransaction } from '../../common/utils/validator';
import { validateDateHexHasPassed } from '../../common/utils/helpers';
import { DEFAULT_CONFIGURATION } from '../../common/utils/default-configuration';
import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { TransactionsService } from './transaction.service';

@Injectable()
export class InfuraService implements OnModuleInit {
  private ws: WebSocket;
  private configuration: Configuration;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly transactionsService: TransactionsService,
    @InjectRepository(Configuration)
    private readonly configurationsRepo: EntityRepository<Configuration>,
  ) {
    this.ws = new WebSocket(
      `${constants.INFURA_WSS_URL}/${this.configService.get<string>(
        'INFURA_PROJECT_ID',
      )}`,
    );
    this.ws.on('open', () => {
      this.ws.send(
        '{"jsonrpc":"2.0","method":"eth_subscribe","params":["newHeads"], "id":1}',
      );
    });

    this.ws.on('message', (data) => {
      const obj = JSON.parse(data.toString());
      const number = obj.params?.result?.number;
      if (number)
        this.processNewHead(number).subscribe(this.filterTransactions);
    });

    this.ws.on('error', (error) => {
      console.log(error);
    });
  }

  async onModuleInit() {
    this.configuration = (
      await this.configurationsRepo.findAll({
        limit: 1,
        orderBy: { createdAt: -1 },
      })
    )[0];
  }

  @OnEvent('configuration')
  handleConfigurationCreatedEvent(event: Configuration) {
    this.configuration = event;
  }

  private processNewHead(number: string) {
    const url = `${constants.INFURA_HTTPS_URL}/${this.configService.get<string>(
      'INFURA_PROJECT_ID',
    )}`;
    const data = `{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params": ["${number}",true],"id":1}`;
    const headers = {
      'Content-Type': 'application/json',
    };
    return this.httpService
      .post(url, data, { headers })
      .pipe(map((response: AxiosResponse) => response.data.result));
  }

  private async filterTransactions(block: { [key: string]: any }) {
    if (!this.configuration) {
      this.configuration = plainToClass(Configuration, DEFAULT_CONFIGURATION);
    }
    if (
      this.configuration.age &&
      !validateDateHexHasPassed(block.timestamp, this.configuration.age)
    )
      return;

    const validTransactions = (<IInfuraTransaction[]>block.transactions).filter(
      (transaction) => validateTransaction(transaction, this.configuration),
    );
    return this.transactionsService.bulkCreate(
      validTransactions,
      this.configuration.id,
    );
  }
}