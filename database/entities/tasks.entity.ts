import { Sequelize } from 'sequelize';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { User } from './user.entity';
import { Teams } from './teams.entity';
import { TeamOfUser } from './teams-of-user';


@Table({})
export class Tasks extends Model<Tasks> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()') })
  id: string;

  @Column({ type: DataType.STRING(256), allowNull: false })
  task: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  checked: boolean;


  
  /*@ForeignKey(() => Teams)
  @Column({ type: DataType.UUID, allowNull: false })
  team_id: string;

  @BelongsTo(() => Teams, 'team_id')
  team: Teams;

  @ForeignKey(() => Teams)
  @Column({ type: DataType.UUID, allowNull: false })
  uye_id: string;

  @BelongsTo(() => Teams, 'uye_id')
  uye: Tasks;*/

  @ForeignKey(() => TeamOfUser)
  @Column({ type: DataType.UUID, allowNull: true})
  teamofuserid: string;

  @BelongsTo(() => TeamOfUser, 'teamofuserid')
  teamofuser: TeamOfUser;
 
  /*@HasMany(() => Teams)
  teams: Teams[];*/

  
}