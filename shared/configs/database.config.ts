import * as envLoader from 'load-env-var';

import { SequelizeModuleOptions } from '@nestjs/sequelize';
//import { TypeOrmModule } from '@nestjs/typeorm'

export default {
    dialect: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    logging: false,
    native: true,
    pool: {
        max: 5,
        idle: 30000,
        acquire: 60000,
    },
    define: {
        underscored: false,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
    database: 'teamTodoApp',
    username: 'postgres',
    password: 'asdqwe1234',
    entities: ['database/entities/*{.js,.ts}'],
    sync: {
        force: false,
        alter: true,
    },
    synchronize: true,
    autoLoadModels: true,
} as SequelizeModuleOptions; 
