import { Column, Table, Model, HasMany } from 'sequelize-typescript';
import { Posts } from './posts.model';

@Table
export class Users extends Model {
  @Column
  user_name: string;

  @Column
  age: number;

  @Column
  password: string;

  @HasMany(() => Posts)
  posts: Posts[];
}
