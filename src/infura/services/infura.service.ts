import {
  Injectable,
  LoggerService,
  OnApplicationBootstrap,
  Inject,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import * as WebSocket from 'ws';
import { ConfigurationsService } from '../../configurations/configuration.service';
import { Configuration } from '../../configurations/models/configuration.model';
import * as constants from '../../common/constants';
import { map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { OnEvent } from '@nestjs/event-emitter';
import { IInfuraTransaction } from '../../common/interfaces/infura-transaction.interface';
import { validateTransaction } from '../../common/utils/validator';
import { validateDateHexHasPassed } from '../../common/utils/helpers';
import { TransactionsService } from './transaction.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class InfuraService implements OnApplicationBootstrap {
  private ws: WebSocket;
  private configuration: Configuration;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly transactionsService: TransactionsService,
    private readonly configurationsService: ConfigurationsService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  /**
   * Sets up websocket connection and listeners
   * Also gets the last configuration.
   */
  async onApplicationBootstrap() {
    // Get last configuration
    this.configuration = (await this.configurationsService.findLast())[0];

    // Set up ws connection
    this.ws = new WebSocket(
      `${constants.INFURA_WSS_URL}/${this.configService.get<string>(
        'INFURA_PROJECT_ID',
      )}`,
    );

    this.ws.on('open', () => {
      this.ws.send(
        '{"jsonrpc":"2.0","method":"eth_subscribe","params":["newHeads"], "id":1}',
      );
      this.logger.debug('ws connection to Infura open');
    });

    this.ws.on('message', (data) => {
      const obj = JSON.parse(data.toString());
      const number = obj.params?.result?.number;

      // check in order to skip the initial message
      if (number) {
        // every time we get response from ws server for new head, process the transactions
        this.processNewHead(number).subscribe((block) =>
          this.filterTransactions(block, this.configuration),
        );
      }
    });

    this.ws.on('error', (error) => {
      this.logger.error('Infura wss error: ', error);
    });
  }

  // Event sent by configurations controller when a new configuration is created in order to use the new one
  @OnEvent('configuration')
  handleConfigurationCreatedEvent(event: Configuration) {
    this.configuration = event;
  }

  /**
   * Triggered when new message comes from Infura for newHeads
   * Sends HTTPS request to infura to get the transactions and pipes the result
   * @param number block number from infura wss response
   */
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

  /**
   * Function to filter the transactions, once response is received from HTTP request from Infura
   */
  private async filterTransactions(
    block: { [key: string]: any },
    configuration: Configuration,
  ) {
    // if block age is older than configuration age - all transactions are passed
    if (
      configuration.age &&
      !validateDateHexHasPassed(block.timestamp, configuration.age)
    )
      return;

    // do validations per configuration property
    const validTransactions = (<IInfuraTransaction[]>block.transactions).filter(
      (transaction) => validateTransaction(transaction, configuration),
    );

    // create valid transactions
    return this.transactionsService.bulkCreate(
      validTransactions,
      this.configuration.id,
    );
  }
}
