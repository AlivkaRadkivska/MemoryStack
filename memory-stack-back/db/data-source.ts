import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export function getDataSourceOptions(
  configService: ConfigService,
): PostgresConnectionOptions {
  return {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DATABASE'),
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
  };
}

const dataSourceOptions = getDataSourceOptions(new ConfigService());
export const AppDataSource = new DataSource(dataSourceOptions);
