import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationsModule } from './configurations/configuration.module';
import { InfuraModule } from './infura/infura.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import options from './config/mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: () => options,
    }),
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    ConfigurationsModule,
    InfuraModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
