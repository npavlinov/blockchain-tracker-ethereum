import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfuraService } from './infura.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigurationsModule } from '../configurations/configuration.module';

@Module({
  imports: [ConfigModule, HttpModule, ConfigurationsModule],
  providers: [InfuraService],
  exports: [InfuraService],
})
export class InfuraModule {}
