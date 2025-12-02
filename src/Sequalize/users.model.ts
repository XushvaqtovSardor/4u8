import {
  Column,
  Table,
  Model,
  HasMany,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript';
import { Posts } from './posts.model';

@Table
export class Users extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column
  declare user_name: string;

  @Column
  declare age: number;

  @Column
  declare password: string;

  @HasMany(() => Posts)
  declare posts: Posts[];
}
