import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfuraService } from './services/infura.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigurationsModule } from '../configurations/configuration.module';
import { Transaction } from './entities/transaction.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TransactionsService } from './services/transaction.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    ConfigurationsModule,
    MikroOrmModule.forFeature([Transaction]),
  ],
  providers: [InfuraService, TransactionsService],
  exports: [InfuraService],
})
export class InfuraModule {}
