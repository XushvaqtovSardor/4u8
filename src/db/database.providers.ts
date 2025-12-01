import { Sequelize } from 'sequelize-typescript';
import { Users } from '../Sequalize/users.model';
import { Posts } from '../Sequalize/posts.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT || '5432'),
        username: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'postgres',
        database: process.env.DATABASE_NAME || 'd4U8',
      });
      sequelize.addModels([Users, Posts]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
