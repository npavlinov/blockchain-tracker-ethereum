import { PrimaryKey, Property } from '@mikro-orm/core';
import { DateTime } from 'luxon';

export abstract class BaseEntity {
  @PrimaryKey()
  id: number;

  @Property({
    type: Date,
    columnType: 'timestamp',
    onCreate: () => DateTime.now().toJSDate(),
  })
  createdAt: Date;

  @Property({
    type: Date,
    columnType: 'timestamp',
    onUpdate: () => DateTime.now().toJSDate(),
    onCreate: () => DateTime.now().toJSDate(),
  })
  updatedAt: Date;
}
