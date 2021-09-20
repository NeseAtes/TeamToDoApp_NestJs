import * as argon2 from 'argon2';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { isDefined } from 'class-validator';
import { create, forIn } from 'lodash';
import { Op, Sequelize, Transaction } from 'sequelize';



import { User } from 'database/entities/user.entity';

import { UsersCreateDto } from './dto/users.create.dto';
import { UsersLookupDto } from './dto/users.lookup.dto';
import { UsersLoginDto } from './dto/users.login.dto';
import { UsersUpdatePasswordDto } from './dto/users.update-password.dto'
import { lookup } from 'dns';
import { error } from 'console';
import { UserAuthenticationPayload } from 'shared/authentications/user/user.payload';


@Injectable()
export class UsersService {
  readonly orderableAttributes = [
    'id',
    'email',
    'fullname',
    'username',
    'password'
  ];
  readonly loadableAttributes = [...this.orderableAttributes];
  readonly searchableAttributes = ['email', 'fullname'];

  readonly defaultOrder = 'createdAt-';

  constructor(
    @InjectModel(User) private readonly model: typeof User,
    private readonly jwtService: JwtService,
    private readonly sequelize: Sequelize,
  ) {}

  async lookup(
    dto: UsersLookupDto,
    transaction?: Transaction,
  ): Promise<{
    rows: User[];
    count: number;
  }> {
    const query: any = {};

    {
      const where: any = {};
      const include: any = {};

      if (isDefined(dto.id)) {
        where.id = dto.id;
      }


      if (isDefined(dto.fullname)) {
        where.fullname = dto.fullname;
      }

      if (isDefined(dto.username)) {
        where.username = dto.username;
      }

      if (isDefined(dto.email)) {
        where.email = dto.email;
      }    

      query.where = where;

    }

    {
      query.order = (this.defaultOrder, this.orderableAttributes);

      query.attributes = this.loadableAttributes;


      query.transaction = transaction;

      query.distinct = true;
    }

    return this.model.findAndCountAll(query);
  }



  async findOneByUserName(username: string): Promise<User> {
    const entity = await this.model.findOne({where: { username } });

    if (isDefined(entity)) {
      throw error;
    }


    return entity;
  
  }


  async findOneById(id: string, transaction?: Transaction): Promise<User> {
    const entity = await this.model.findByPk(id, { transaction });

    if (!isDefined(entity)) {
      throw error;
    }

    return entity;
  }


  async create(dto: UsersCreateDto): Promise<{user :User; token: string}> {

    await this.findOneByUserName(dto.username);

    const entity = this.model.build();

    entity.fullname = dto.fullname;
    entity.username = dto.username;
    entity.email = dto.email;
    entity.password = await argon2.hash(dto.password);

    try {

      await entity.save();

    } catch (error) {
      throw error;
    }

    entity.password = undefined;
    const payload: UserAuthenticationPayload = { id: entity.id };
    const token = await this.jwtService.signAsync(payload);


    return {
      user: entity,
      token
    };

  }
  

  async login(dto: UsersLoginDto): Promise<{ user: User; token: string }> {

    const entity = await this.model.findOne({ where: { username: dto.username } });

    if (!isDefined(entity) || !(await argon2.verify(entity.password, dto.password))) {
      throw error;
    }

    await entity.save();

    entity.password = undefined;

    const payload: UserAuthenticationPayload = { id: entity.id };
    const token = await this.jwtService.signAsync(payload);

    return {
      user: entity,
      token
    };
  }


  async updatePassword(dto: UsersUpdatePasswordDto): Promise<void> {
    if (dto.newPassword !== dto.newPasswordConfirmation) {
      throw error;
    }

    const entity = await this.model.findByPk(dto.id, {
      attributes: ['id', 'password'],
    });

    if (!isDefined(entity)) {
      throw error;
    }

    if (!(await argon2.verify(entity.password, dto.currentPassword))) {
      throw console.error("HATA");
      
    }

    entity.password = await argon2.hash(dto.newPassword);

    await entity.save();
  }



  async destroy(username: string): Promise<void> {
    const result = await this.model.destroy({ where: { username } });

    if (result !== 1) {
      throw error;
      
    }
  }
}
