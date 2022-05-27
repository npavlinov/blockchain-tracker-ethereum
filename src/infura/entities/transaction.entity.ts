import {
  Property,
  Entity,
  ManyToOne,
  IdentifiedReference,
} from '@mikro-orm/core';
import { BaseEntity } from '../../common/entities/base.entity';
import { Configuration } from '../../configurations/entities/configuration.entity';

@Entity()
export class Transaction extends BaseEntity {
  @Property()
  blockHash: string;

  @Property()
  blockNumber: string;

  @Property()
  from: string;

  @Property()
  gas: string;

  @Property()
  gasPrice: string;

  @Property()
  hash: string;

  @Property()
  input: string;

  @Property()
  nonce: string;

  @Property()
  r: string;

  @Property()
  s: string;

  @Property()
  to: string;

  @Property()
  transactionIndex: string;

  @Property()
  type: string;

  @Property()
  v: string;

  @Property()
  value: string;

  @ManyToOne(() => Configuration)
  configurationId: IdentifiedReference<Configuration>;
}
