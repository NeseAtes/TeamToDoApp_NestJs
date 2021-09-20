import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';

import { TeamOfUser } from 'database/entities/teams-of-user';

import { TeamOfUserController } from './teams-of-user.controller';

import { TeamOfUserService } from './teams-of-user.service';

@Module({
  imports: [
    PassportModule.register({}),
    SequelizeModule.forFeature([TeamOfUser])],
  controllers: [TeamOfUserController],
  providers: [TeamOfUserService],
  exports: [TeamOfUserService],
})
export class TeamOfUserModule {}
