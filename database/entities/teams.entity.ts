import { Sequelize } from 'sequelize';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Col } from 'sequelize/types/lib/utils';
import { User } from './user.entity';

@Table
export class Teams extends Model<Teams> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()') })
  id: string;

  @Column({ type: DataType.STRING(256), allowNull: false })
  teamName: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  durum: boolean;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  member_id: string;

  @HasMany(() => User)
  users: User[];
}