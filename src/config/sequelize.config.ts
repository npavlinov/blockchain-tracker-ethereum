import { SequelizeModuleOptions } from '@nestjs/sequelize';
import 'dotenv/config';

const config: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_NAME),
  autoLoadModels: true,
  synchronize: true,
};

export default config;
