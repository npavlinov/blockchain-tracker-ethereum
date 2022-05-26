import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs';

const config: Options = {
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  forceUtcTimezone: true,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  dbName: String(process.env.DB_NAME),
  type: 'postgresql',
  migrations: {
    tableName: 'migrations', // name of database table with log of executed transactions
    path: './dist/migrations', // path to the folder with migrations
    pathTs: './migrations', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    allOrNothing: true, // wrap all migrations in master transaction
    emit: 'ts', // migration generation mode
    snapshot: false,
  },
  seeder: {
    path: './dist/seeders', // path to the folder with seeders
    pathTs: './seeders', // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
  },
};

export default config;
