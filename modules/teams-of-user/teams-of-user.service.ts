import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { isUUID } from 'class-validator';
import { Transaction } from 'sequelize';

//import { ServerError, ServerErrorType } from 'src/shared/configs/errors.config';

import { TeamOfUser } from 'database/entities/teams-of-user';

import { TeamOfUserCreateDto } from './dto/teams-of-user.create.dto';
import { error } from 'console';

@Injectable()
export class TeamOfUserService {
  constructor(@InjectModel(TeamOfUser) private readonly model: typeof TeamOfUser) {}

  async create(dto: TeamOfUserCreateDto, transaction?: Transaction): Promise<TeamOfUser> {
    const entity = this.model.build();

    entity.team_id = dto.team_id;
    entity.member_id = dto.member_id;

    return entity.save({ transaction });
  }

  async bulkCreate(dtoArray: TeamOfUserCreateDto[], transaction?: Transaction): Promise<TeamOfUser[]> {
    const entities = dtoArray.map(dto => ({
      team_id: dto.team_id,
      member_id: dto.member_id,
    }));

    return this.model.bulkCreate(entities, { transaction });
  }

  async destroy(id: string): Promise<void> {
    if (!isUUID(id, 4)) {
      throw error;
    }

    const result = await this.model.destroy({ where: { id } });

    if (result !== 1) {
      throw error;
    }
  }

  async destroyByMemberId(member_id: string): Promise<void> {
    if (!isUUID(member_id, 4)) {
      throw error;
    }

    await this.model.destroy({ where: { member_id } });
  }
}
