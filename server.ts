import app from './app';
import dotenv from 'dotenv';
//connection to data base
import { DataSource } from 'typeorm';
import { Task } from './SRC/Entity/task.entity';

dotenv.config({ path: './config.env' });
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  //no matter entitty that we want to generate to column need to specify here
  entities: [Task],
  synchronize: true,
});

// AppDataSource.initialize()
//   // make sure type orm connect to mysql server
//   .then(() => {
//     app.listen(process.env.PORT, () => console.log('hello to server '));
//   })
//   .catch((er) => console.log('Error during data source', er));

const server = async function () {
  try {
    await AppDataSource.initialize();
    app.listen(process.env.PORT, () => console.log('hello to server '));
  } catch (error) {
    console.log(error);
  }
};

server();
