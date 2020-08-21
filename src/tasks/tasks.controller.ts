import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaksStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidatorPipe } from './pipes/task-status-validation.pipe';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){};

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
        if(Object.keys(filterDto).length) {
            return this.tasksService.getTaskWithFilters(filterDto)
        }
        
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string ): Task {
      return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads'
        })
    }))
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @UploadedFile() attachmentTask
        ): Task {
       return this.tasksService.createTasks(createTaskDto, attachmentTask);
        
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string, 
        @Body('status', TaskStatusValidatorPipe) status: TaksStatus
        ): Task {
            return this.tasksService.updateTaskStatus(id, status);
        }
    
    @Post('attachment')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads'
        })
    }))
    pdfAttachmentTask(@UploadedFile() file) {
       console.log(file);
       
    }

}
