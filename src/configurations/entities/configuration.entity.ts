import { Property, Entity } from '@mikro-orm/core';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class Configuration extends BaseEntity {
  @Property({ nullable: true })
  fromAddress?: string;

  @Property({ nullable: true })
  toAddress?: string;

  /**
   *  Value to be filtered by in ethereum
   *  Any transaction larger than or equal this value would be added
   * */
  @Property({ nullable: true })
  value?: number;

  @Property({ nullable: true })
  hash?: string;

  @Property({
    type: Date,
    columnType: 'timestamp',
    nullable: true,
  })
  age?: Date;
}
