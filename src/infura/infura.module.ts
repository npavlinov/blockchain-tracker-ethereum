import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfuraService } from './services/infura.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigurationsModule } from '../configurations/configuration.module';
import { Transaction } from './entities/transaction.model';
import { TransactionsService } from './services/transaction.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { WinstonModule } from 'nest-winston';
import winstonOptions from '../config/winston.config';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    ConfigurationsModule,
    SequelizeModule.forFeature([Transaction]),
    WinstonModule.forRoot(winstonOptions),
  ],
  providers: [InfuraService, TransactionsService, Logger],
  exports: [InfuraService],
})
export class InfuraModule {}
