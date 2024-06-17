import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export function getDataSourceOptions(
  configService: ConfigService,
): PostgresConnectionOptions {
  return {
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_DATABASE'),
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
  };
}

const dataSourceOptions = getDataSourceOptions(new ConfigService());
export const AppDataSource = new DataSource(dataSourceOptions);
