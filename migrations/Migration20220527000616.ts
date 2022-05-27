import { Migration } from '@mikro-orm/migrations';

export class Migration20220527000616 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "transaction" ("id" serial primary key, "created_at" timestamp not null, "updated_at" timestamp not null, "block_hash" varchar(255) not null, "block_number" varchar(255) not null, "from" varchar(255) not null, "gas" varchar(255) not null, "gas_price" varchar(255) not null, "hash" varchar(255) not null, "input" varchar(255) not null, "nonce" varchar(255) not null, "r" varchar(255) not null, "s" varchar(255) not null, "to" varchar(255) not null, "transaction_index" varchar(255) not null, "type" varchar(255) not null, "v" varchar(255) not null, "value" varchar(255) not null, "configuration_id_id" int not null);',
    );

    this.addSql(
      'alter table "transaction" add constraint "transaction_configuration_id_id_foreign" foreign key ("configuration_id_id") references "configuration" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "transaction" cascade;');
  }
}
