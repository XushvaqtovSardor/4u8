import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';
import { Users } from './users.model';
@Table
export class Posts extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column
  declare post_title: string;

  @Column
  declare context: string;

  @ForeignKey(() => Users)
  @Column
  declare userId: number;

  @BelongsTo(() => Users)
  declare user: Users;
}
