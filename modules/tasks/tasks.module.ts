import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';


import { TasksController } from 'modules/tasks/tasks.controller';

import { Tasks } from 'database/entities/tasks.entity';


import { TasksService } from 'modules/tasks/tasks.service';

@Module({
  imports: [
    PassportModule.register({}),
    SequelizeModule.forFeature([Tasks]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
