import { Sequelize } from 'sequelize';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Tasks } from './tasks.entity';

import { Teams } from './teams.entity';
import { User } from './user.entity';

@Table({})
export class TeamOfUser extends Model<TeamOfUser> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()') })
  id: string;

  @ForeignKey(() => Teams)
  @Column({ type: DataType.UUID, allowNull: false })
  team_id: string;

  @BelongsTo(() => Teams, {
    foreignKey: 'team_id',
    onDelete: 'CASCADE',
    hooks: true,
  })
  team: Teams;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  member_id: string;

  @BelongsTo(() => User, {
    foreignKey: 'member_id',
    onDelete: 'CASCADE',
    hooks: true,
  })
  user: User;


  @HasMany(() => Tasks)
  teamofuser: Tasks[];
}
