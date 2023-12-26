import { Router } from 'express';
import TaskController from '../Controller/task.controller';
import { createUpdateValidator, createValidator } from '../Validator/task.validator';

// const router = express.Router();
const taskRouter: Router = Router();
taskRouter
  .route('/')
  .get(TaskController.getAllTasks)
  .post(createValidator, TaskController.create);

taskRouter.route('/:id').patch(createUpdateValidator, TaskController.updateTask);

export default taskRouter;
