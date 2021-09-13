import { Sequelize } from 'sequelize';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';


@Table({
    defaultScope: {
      attributes: {
        exclude: ['password'],
      },
    },
    scopes: {
      full: {
        attributes: {
          exclude: [],
        },
      },
    },
  })
export class User extends Model<User> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: Sequelize.literal('uuid_generate_v4()') })
  id: string;

  @Column({ type: DataType.STRING(256), allowNull: false })
  fullname: string;

  @Column({ type: DataType.STRING(254), allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  password: string;

  
}