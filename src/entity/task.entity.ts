import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum TaskStatus{
    Created = 1,
    InProgress = 2,
    Done = 3
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true, length: 64})
  title: string;

  @Column({nullable:true, length: 64})
  description : string;
  
  @Column({ nullable:false, default: TaskStatus.Created })
  status: TaskStatus;

 
 
}