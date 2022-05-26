import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Configuration } from './entities/configuration.entity';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationsService } from './configuration.service';

@Module({
  imports: [MikroOrmModule.forFeature([Configuration])],
  controllers: [ConfigurationController],
  providers: [ConfigurationsService],
  exports: [ConfigurationsService, MikroOrmModule.forFeature([Configuration])],
})
export class ConfigurationsModule {}
