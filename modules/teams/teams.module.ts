import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';


import { TeamsController } from 'modules/teams/teams.controller';

import { Teams } from 'database/entities/teams.entity';
import { User } from 'database/entities/user.entity';
import { TeamOfUser } from 'database/entities/teams-of-user';

import { TeamOfUserModule } from 'modules/teams-of-user/teams-of-user.module';
import { UsersModule } from 'modules/users/users.module';

import { TeamsService } from 'modules/teams/teams.service';
import { UserAuthenticationStrategy } from 'shared/authentications/user/user.strategy';

@Module({
  imports: [
    PassportModule.register({}),
    SequelizeModule.forFeature([Teams, User, TeamOfUser]),
    TeamOfUserModule,
    UsersModule
  ],
  controllers: [TeamsController],
  providers: [TeamsService,UserAuthenticationStrategy],
  exports: [TeamsService]
})
export class TeamsModule {}
