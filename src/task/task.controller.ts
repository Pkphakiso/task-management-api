import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateTaskDTO } from './dto/createTask.dto';
import { UpdateTaskDTO } from './dto/updateTast.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService){}
 
    @Get()
    public async getAll(){
        const resp = await this.taskService.getAll();
        return resp;
    }

    @Get('/:id')
    public async getOne( @Param("id") id: number){
        const resp = await this.taskService. getOne(id);
        return resp;
    }

    @Post()
    public async createOne(@Body() createTaskRequest:CreateTaskDTO){
        const resp = await this.taskService.createOne(createTaskRequest);
        return resp;
    }
    @Patch("/:id")
    public async updateTask(@Param("id") id :number, @Body() updateTaskRequest: UpdateTaskDTO ){
        const resp = await this.taskService.updateTask(id, updateTaskRequest) ;
         return resp ;
    }
    @Delete("/:id")
    @HttpCode(HttpStatus.NOT_FOUND)
    public async deleteOne(@Param("id") id : number ){
        const resp = await this.taskService.deleteOne(id);
        return resp;
    }
   
}
