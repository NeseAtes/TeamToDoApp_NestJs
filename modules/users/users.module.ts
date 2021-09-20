import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserAuthenticationStrategy } from 'shared/authentications/user/user.strategy';

import { UsersController } from 'modules/users/users.controller';

import { User } from 'database/entities/user.entity';

import { UsersService } from 'modules/users/users.service';

@Module({
  imports: [
    JwtModule.register({ secret: 'JWT_SECRET' }),
    PassportModule.register({}),
    SequelizeModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService,UserAuthenticationStrategy],
})
export class UsersModule {}
