import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { isDefined } from 'class-validator';
import { create, forIn } from 'lodash';
import { Includeable, Op, Sequelize, Transaction } from 'sequelize';



import { User } from 'database/entities/user.entity';
import { Tasks } from 'database/entities/tasks.entity';

import { TasksLookupDto } from './dto/tasks.lookup.dto';
import { TasksCreateDto } from './dto/tasks.create.dto';
import { TasksUpdateDto } from './dto/tasks.taskUpdate.dto';
import { CheckUpdateDto } from './dto/tasks.checkUpdate.dto';

import { lookup } from 'dns';
import { error } from 'console';
import { TeamOfUser } from 'database/entities/teams-of-user';


@Injectable()
export class TasksService {
  readonly orderableAttributes = [
    'id',
    'task',
    'teamofuserid',
    'checked'
  ];
  readonly loadableAttributes = [...this.orderableAttributes];
  readonly searchableAttributes = ['task'];

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
      attributes: ['team_id', 'member_id'],
      include: [
        /*{
          model: Teams,
          required: false,
          attributes: ['id', 'teamName']
        }
        {
          model: User,
          required: false,
          attributes: ['id', 'username']
        },*/
            
      ],
      required: false,
    },
  ];

  constructor(
    @InjectModel(Tasks) private readonly model: typeof Tasks,
    private readonly sequelize: Sequelize,
  ) {}


  async lookup(dto: TasksLookupDto,transaction?: Transaction,): Promise<{rows: Tasks[]; count: number;}> {
    const query: any = {};

    {
      const where: any = {};
      const include: any = [...this.defaultInclude];
      

      if (isDefined(dto.id)) {
        where.id = dto.id;
      }

      if (isDefined(dto.task)) {
        where.task = dto.task;
      }
      
      if (isDefined(dto.teamofuserid)) {
        where.teamofuserid = dto.teamofuserid;
      }

      if (isDefined(dto.checked)) {
        where.checked = dto.checked;
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


  async findOneById(id: string, transaction?: Transaction): Promise<Tasks> {
    const entity = await this.model.findByPk(id, { transaction });

    if (!isDefined(entity)) {
      throw error;
    }

    return entity;
  }


  async create(dto: TasksCreateDto): Promise<{tasks :Tasks}> {

    const entity = this.model.build();

    entity.task = dto.task;
    entity.teamofuserid = dto.teamofuserid;

    try {
      await entity.save();
    } catch (error) {
      throw error;
    }


    return {
      tasks: entity,
    };

  }


  async updateTask(dtoArray: TasksUpdateDto): Promise<Tasks> {
  
    const entity = await this.model.findByPk(dtoArray.id, {
      attributes: ['id', 'task'],
    });
    const vle = await this.model.update(
      { task: dtoArray.task },
      { where: { id: dtoArray.id }, returning: true },
    );


    if (!isDefined(entity)) {
      throw error;
    }

    //await entity.save(vle);

    return vle[1][0];  
  }


  async checkedTask(dtoArray: CheckUpdateDto): Promise<Tasks> {
  
    const entity = await this.model.findByPk(dtoArray.id, {
      attributes: ['id', 'checked'],
    });
    const vle = await this.model.update(
      { checked: true},
      { where: { id: dtoArray.id }, returning: true },
    );


    if (!isDefined(entity)) {
      throw error;
    }

    //await entity.save(vle);

    return vle[1][0];  
  }
  

  async destroy(id: string): Promise<void> {
    const result = await this.model.destroy({ where: { id } });

    if (result !== 1) {
      throw error;
      
    }
  }


  

}