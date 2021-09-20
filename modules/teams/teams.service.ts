import * as argon2 from 'argon2';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { isDefined, isUUID } from 'class-validator';
import { create, forIn } from 'lodash';
import { Includeable, Op, Sequelize, Transaction } from 'sequelize';



import { User } from 'database/entities/user.entity';
import { Teams } from 'database/entities/teams.entity';
import { TeamOfUser } from 'database/entities/teams-of-user';


import { TeamOfUserService } from 'modules/teams-of-user/teams-of-user.service';

import { TeamsLookupDto } from './dto/teams.lookup.dto';
import { TeamsCreateDto } from './dto/teams.create.dto';
import { TeamOfUserCreateDto } from 'modules/teams-of-user/dto/teams-of-user.create.dto';


import { lookup } from 'dns';
import { error } from 'console';


@Injectable()
export class TeamsService {
  readonly orderableAttributes = [
    'id',
    'teamName'
  ];
  readonly loadableAttributes = [...this.orderableAttributes];
  readonly searchableAttributes = ['teamName'];

  readonly defaultOrder = 'createdAt-';


  readonly defaultInclude: Includeable[] = [
    // {
    //   model: User,
    //   where: {},
    //   attributes: ['id', 'email', 'fullname'],
    //   required: false,
    // },
    {
      model: TeamOfUser,
      where: {},
      attributes: ['member_id'],
      include: [
        /*{
          model: Teams,
          required: false,
          attributes: ['id', 'teamName']
        }*/
        {
          model: User,
          required: false,
          attributes: ['id']
        }
            
      ],
      required: false,
    },
  ];




  constructor(
    @InjectModel(Teams) private readonly model: typeof Teams,
    private readonly TeamOfUserService: TeamOfUserService,
    private readonly sequelize: Sequelize,

  ) {}

  async lookup(
    dto: TeamsLookupDto,
    transaction?: Transaction,
  ): Promise<{
    rows: Teams[];
    count: number;
  }> {
    const query: any = {};

    {
      const where: any = {};
      const include: any = [...this.defaultInclude];


      if (isDefined(dto.id)) {
        where.id = dto.id;
      }
      console.log("includeee", dto);


      if (isDefined(dto.teamName)) {
        where.teamName = dto.teamName;
      }

      if (isDefined(dto.captainId)) {
        //where.member_id = dto.member_id;
        include[0].where.captainId = dto.captainId;
      }

      query.where = where;
      query.include = include;

    }

    {
      query.order = (this.defaultOrder, this.orderableAttributes);

      query.attributes = this.loadableAttributes;


      query.transaction = transaction;

      query.distinct = true;
    }

    return this.model.findAndCountAll(query);
  }


  async findOneByTeamId(id: string): Promise<Teams> {
    const entity = await this.model.findByPk( id );

    return entity;
  }


  async create(dto: TeamsCreateDto): Promise<Teams> {

    const entity = this.model.build();
    console.log("Entitiyyyyyyyy", entity);
    entity.teamName = dto.teamName;
    entity.captainId = dto.captainId;
    //entity.durum = dto.durum;

    await this.sequelize.transaction(async transaction => {
      await entity.save({ transaction });


      if (isDefined(dto.member_id)) {
        const createTeamsDtoArray = [{team_id: entity.id, member_id: dto.member_id}];

        await this.TeamOfUserService.bulkCreate(createTeamsDtoArray, transaction);
      }

    });

    await entity.reload({
      include: [...this.defaultInclude],
    });

    return entity;
  }
  


  async deleteMember(id: string): Promise<void> {


    await this.model.destroy({ where: { id } });

    // const entity = await this.model.findByPk(dtoArray.id, {
    //   attributes: ['id', 'checked'],
    // });
   

    // await this.TeamOfUserService.destroyByMemberId(dto.id);
  
    //const result = await this.TeamOfUserService.destroyByMemberId(id);
    //const result = await this.model.destroy({ where: { id } });

    // if (result !== 1) {
    //   throw error;
      
    // }
  }
}
