import { Sequelize } from 'sequelize';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Col } from 'sequelize/types/lib/utils';
import { Tasks } from './tasks.entity';
import { User } from './user.entity';
import { TeamOfUser } from './teams-of-user';

@Table({})
export class Teams extends Model<Teams> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()') })
  id: string;

  @Column({ type: DataType.STRING(256), allowNull: false })
  teamName: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  captainId: string;

  @BelongsTo(() => User, 'captainId')
  captain: User;

  /*@Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  durum: boolean;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  member_id: string;

  @BelongsTo(() => User, 'member_id')
  member: User;*/

  @HasMany(() => TeamOfUser, {
    onDelete: 'CASCADE',
    hooks: true
  })
  teamOfUser: TeamOfUser;

 /* @HasMany(() => User, {
    hooks: true
  })
  user: User;*/

  // @HasMany(() => Tasks)
  // tasks: Tasks[];

  /*@HasOne(() => TeamOfUser, {
    onDelete: 'CASCADE',
    hooks: true
  })
  teamofuse: TeamOfUser;*/


}