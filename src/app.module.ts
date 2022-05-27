import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigurationsModule } from './configurations/configuration.module';
import { InfuraModule } from './infura/infura.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import options from './config/sequelize.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync({
      useFactory: () => options,
    }),
    EventEmitterModule.forRoot(),
    ConfigurationsModule,
    InfuraModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
