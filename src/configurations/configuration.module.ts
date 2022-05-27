import { Module } from '@nestjs/common';
import { Configuration } from './models/configuration.model';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationsService } from './configuration.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Configuration])],
  controllers: [ConfigurationController],
  providers: [ConfigurationsService],
  exports: [ConfigurationsService],
})
export class ConfigurationsModule {}
