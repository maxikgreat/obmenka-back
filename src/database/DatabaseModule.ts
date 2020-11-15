import {Module} from '@nestjs/common';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import User from './entities/User';
import LocalLogin from './entities/LocalLogin';
import Session from './entities/Session';
import File from './entities/File';
import Rate from 'database/entities/Rate';
import OptRate from 'database/entities/OptRate';
import {IConfigService} from '@spryrocks/config-node';
import {ConfigModule} from 'services/config/ConfigModule';
import Client from './entities/Client';

const entities = [
  //
  User,
  Rate,
  OptRate,
  LocalLogin,
  Session,
  File,
  Client,
];

const options = (configService: IConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.getNumber('DATABASE_PORT'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  synchronize: configService.getBoolean('DATABASE_SYNCHRONIZE', false),
  logging: 'all',
  entities,
});

@Module({
  imports: [
    //
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [IConfigService],
      useFactory: options,
    }),
    TypeOrmModule.forFeature(entities),
  ],
  exports: [
    //
    TypeOrmModule,
  ],
})
export class DatabaseModule {}
