import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import databaseConfig from './shared/configs/database.config';
import { Tasks } from './database/entities/tasks.entity';

import { UsersModule } from './modules/users/users.module';
import { TeamsModule } from './modules/teams/teams.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { TeamOfUserModule } from 'modules/teams-of-user/teams-of-user.module';


@Module({
    imports: [
      SequelizeModule.forRoot(databaseConfig),
      SequelizeModule.forFeature([ Tasks

      ]),     
      UsersModule,
      TeamsModule,
      TasksModule,
      TeamOfUserModule
    ],
  })
  export class AppModule {}