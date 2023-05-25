import {ConfigModule} from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import baseConfig from './base-config';
import { Category, Objects, Sector, Institution, City, User  } from '../entities';
ConfigModule.forRoot({
    isGlobal: true,
    load: [baseConfig],
});

export const DataSourceConfig: DataSourceOptions = {
    type: process.env.TYPEORM_CONNECTION as any,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.TYPEORM_PORT,10),
    username : process.env.TYPEORM_USERNAME,
    password : process.env.TYPEORM_PASSWORD,
    database : process.env.TYPEORM_DATABASE,
    entities: [User, City, Institution, Sector, Objects, Category],
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    logging: process.env.TYPEORM_LOGGING === 'true',
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
};

export const AppDs = new DataSource(DataSourceConfig);
