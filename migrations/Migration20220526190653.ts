import { Migration } from '@mikro-orm/migrations';

export class Migration20220526190653 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "configuration" ("id" serial primary key, "created_at" timestamp not null, "updated_at" timestamp not null, "from_address" varchar(255) null, "to_address" varchar(255) null, "value" int null, "hash" varchar(255) null, "age" timestamp null);',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table "configuration"');
  }
}
