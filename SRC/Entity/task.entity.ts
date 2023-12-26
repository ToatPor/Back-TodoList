import { Status } from '../Enums/status';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Priority } from '../Enums/priority';
//entity in type is your table, schema or model
//defining all the columns that you want to have in your database
// import { Priority } from '../enums/priority';
// import { Status } from '../enums/status';
//type orm alwaus a class
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  Title: string;

  @Column({ type: 'varchar', length: '255' })
  Date: string;

  @Column({ type: 'longtext' })
  Description: string;

  @Column({ type: 'enum', enum: Priority, default: Priority.normal })
  Priority: Priority;

  @Column({ type: 'enum', enum: Status, default: Status.todo })
  Status: Status;
}
