import { castchAsync } from './../Utilities/catchAsyn';
import { AppDataSource } from '../../server';
import { Response, Request, NextFunction } from 'express';
import { Task } from '../Entity/task.entity';
import { AppError } from '../Utilities/Error';
import { UpdateResult } from 'typeorm';
// import { createValidator } from '../task.validator';
// import { validationResult } from 'express-validator';
// import { castchAsync } from '../Utilities/catchAsyn';
//convert instance of class to plain object
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { validationResult } from 'express-validator';

class TaskController {
  //fetch all data
  @castchAsync
  public async getAllTasks(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    //type orm return instance of a task entity need to convert to object
    const allTasks = await AppDataSource.getRepository(Task).find({
      order: { Date: 'ASC' },
    });

    if (!allTasks.length) return next(new AppError('there is no data in database', 400));

    //convert instance object to plain object
    const objectPlain = instanceToPlain(allTasks) as Task[];

    return res.status(200).json(objectPlain);
  }

  //read create data
  public async create(req: Request, res: Response): Promise<Response | void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newTask = new Task();
    newTask.Title = req.body.Title;
    newTask.Date = req.body.Date;
    newTask.Description = req.body.Description;
    newTask.Priority = req.body.Priority;
    newTask.Status = req.body.Status;

    try {
      const creatTask = await AppDataSource.getRepository(Task).save(newTask);
      const data = instanceToPlain(creatTask) as Task[];
      return res.json(data).status(200);
    } catch (err) {
      return res.json({ error: 'ther is an error' }).status(400);
    }
  }

  //read update task
  public async updateTask(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //find is there any task with this id
      const task = await AppDataSource.getRepository(Task).findOne({
        where: { id: req.params.id },
      });

      if (!task)
        return res.status(404).json({ error: 'The task with given Id does not exist' });
      const updateTask: UpdateResult = await AppDataSource.getRepository(Task).update(
        req.params.id,
        plainToInstance(Task, { Status: req.body.Status }),
      );

      const updateData = instanceToPlain(updateTask) as UpdateResult;

      return res.status(200).json({ data: updateData });
    } catch (errors) {
      console.log(errors);

      return res.json({ error: 'ther is an error dick' }).status(500);
    }
  }
}

export default new TaskController();
