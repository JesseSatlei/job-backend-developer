import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQLDB_HOST || 'localhost',
  port: parseInt(process.env.MYSQLDB_PORT, 10) || 3306,
  username: process.env.MYSQLDB_USER || 'root',
  password: process.env.MYSQLDB_PASSWORD || 'senha_root_123',
  database: process.env.MYSQLDB_DATABASE || 'banking',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.TYPEORM_SYNC === 'true',
  migrationsRun: true,
};
