//interface type of express that provide for us
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import taskRouter from './SRC/Router/task.route';
import { AppError } from './SRC/Utilities/Error';
import { handleError } from './SRC/Controller/handleError';

const app: Express = express();
//incoming request body incoming json file and convert to object
app.use(cors());
app.use(bodyParser.json());

//root task tell express with route we gonna visit
app.use('/api/v1/task', taskRouter);

//any route that not exist i will throw error
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
//central place of error

app.use(handleError);

export default app;
