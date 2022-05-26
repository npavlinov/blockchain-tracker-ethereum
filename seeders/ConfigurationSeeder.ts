import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Configuration } from '../src/configurations/entities/configuration.entity';
import { DateTime } from 'luxon';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Configuration, {
      value: 1,
      age: DateTime.now().minus({ days: 6 }),
    });
  }
}
