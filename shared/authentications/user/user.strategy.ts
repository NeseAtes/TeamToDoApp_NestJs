import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/sequelize';
import { isDefined } from 'class-validator';
import { Strategy, ExtractJwt } from 'passport-jwt';

//import securityConfig from 'shared/configs/security.config';

import { UserAuthenticationPayload } from './user.payload';

import { User } from 'database/entities/user.entity';


@Injectable()
export class UserAuthenticationStrategy extends PassportStrategy(Strategy, 'user-from-jwt') {
  constructor(@InjectModel(User) private readonly model: typeof User) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //secretOrKey: securityConfig.jwt.secret,
      secretOrKey: 'JWT_SECRET',
    });

  }

  async validate(payload: UserAuthenticationPayload): Promise<User> {

    const user = await this.model.findByPk(payload.id, {
      include: [
        // {
        //   model: UserRole,
        //   required: true,
        //   attributes: ['permissions'],
        // },
      ],
    });


    if (!isDefined(user)) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
