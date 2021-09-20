import { Sequelize } from 'sequelize';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Tasks } from 'database/entities/tasks.entity';
import { Teams } from 'database/entities/teams.entity';
import { TeamOfUser } from './teams-of-user';


@Table({})
export class User extends Model<User> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()') })
  id: string;

  @Column({ type: DataType.STRING(256), allowNull: false })
  fullname: string;

  @Column({ type: DataType.STRING(256), allowNull: false })
  username: string;

  @Column({ type: DataType.STRING(254), allowNull: false })
  email: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  password: string;


  @HasMany(() => TeamOfUser)
  userofteams: TeamOfUser[];

  @HasMany(() => Teams)
  captan: Teams[];  
}