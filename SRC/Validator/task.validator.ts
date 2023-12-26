import { body, ValidationChain } from 'express-validator';
import { Priority } from '../Enums/priority';
import { Status } from '../Enums/status';

//checking validate in middleware before sending to controller
export const createValidator: ValidationChain[] = [
  body('Title')
    .not()
    .isEmpty()
    .withMessage('The title need to fill')
    .trim()
    .isString()
    .withMessage('Title need to be text format'),

  body('Date')
    .not()
    .isEmpty()
    .withMessage('The task date is mandatory')
    .isString()
    .withMessage('Date needs to be in validate format'),

  body('Description')
    .trim()
    .isString()
    .withMessage('Description need to be in text format'),

  body('Priority')
    .trim()
    .isIn([Priority.high, Priority.low, Priority.normal])
    .withMessage('Priority can only high or low'),

  body('Status')
    .trim()
    .isIn([Status.completed, Status.inProgress, Status.todo])
    .withMessage('Status can only be completed inprogress or todo'),
];

export const createUpdateValidator: ValidationChain[] = [
  // body('id')
  //   .not()
  //   .isEmpty()
  //   .withMessage('The task id is need')
  //   .trim()
  //   .isString()
  //   .withMessage('Id need to be a valid uuid format'),
  body('Status')
    .trim()
    .isIn([Status.completed, Status.inProgress, Status.todo])
    .withMessage('Status can only be completed inprogress or todo'),
  body('id'),
];
