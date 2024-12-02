import { Movie } from '@domain/movie.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.MYSQLDB_HOST,
  port: parseInt(process.env.MYSQLDB_PORT, 10),
  username: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
  entities: [Movie],
  synchronize: process.env.TYPEORM_SYNC === 'true',
  migrationsRun: true,
  ssl:
    process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
};
