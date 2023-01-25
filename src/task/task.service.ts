import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskStatus } from 'src/entity/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/createTask.dto';
import { TaskDTO } from './dto/task.dto';
import { UpdateTaskDTO } from './dto/updateTast.dto';

@Injectable()
export class TaskService {

    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>){}

    public async createOne(createTaskRequest:CreateTaskDTO){
        const task: Task = new Task();
        
        task.title = createTaskRequest.title;
        task.description = createTaskRequest.description;
        task.status = TaskStatus.Created;

        await this.taskRepository.save(task);

        const taskDTO = new TaskDTO();
        taskDTO.id = task.id;
        taskDTO.title = task.title;
        taskDTO.description = task.description;
        taskDTO.status = TaskStatus.Created ;

        return taskDTO;
    }
    
    public entityToDTO(task:Task): TaskDTO {
        const taskDTO = new TaskDTO();
        taskDTO.id = task.id;
        taskDTO.title = task.title;
        taskDTO.description = task.description;
        taskDTO.status = TaskStatus.Created ;
        
        return taskDTO;
    }

    public async getAll(){
        const tasks: Task[] = await this.taskRepository.find();
        const tasksDTO:TaskDTO[] = tasks.map(x => this.entityToDTO(x));
        
        return tasksDTO;
    }
    public async getOne(id:number){
        const task: Task = await this.taskRepository.findOne({where: {id}});

        if(!task){
            throw new NotFoundException(`Task with the id ${id}`);
            
        }
        const taskDTO: TaskDTO= this.entityToDTO(task);

        return taskDTO;

    }
    public async updateTask(id: number, updateTaskRequest: UpdateTaskDTO){

        const task: Task = await this.getOne(id);
        if(updateTaskRequest.title)
            task.title = updateTaskRequest.title;
        if(updateTaskRequest.description)
            task.description = updateTaskRequest.description;
        if(updateTaskRequest.status)
            task.status = updateTaskRequest.status;
        
        await this.taskRepository.save(task);

        const taskDTO: TaskDTO = this.entityToDTO(task);

        return taskDTO;

    }
    public async deleteOne(id: number){
        
        const task: Task = await this.getOne(id);

        if(!task)
            throw new NotFoundException(`No record found by the ID ${id} `)

        await this.taskRepository.remove(task);

        // return null;

    }
}
