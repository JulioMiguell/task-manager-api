import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaksStatus } from './tasks.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';


@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }
    
    getTaskWithFilters(filterDto: GetTaskFilterDto): Task[] {
        const { status, search} = filterDto;

        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }

        if (search) {
            tasks = tasks.filter(task => 
                task.title.includes(search) ||
                task.description.includes(search)
            );
        }
        
        return tasks;
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find(task => task.id === id);

        if (!found) {
            throw new NotFoundException(`Task with "${id}" not found`);
        }

        return found;
    }

    createTasks(createTaskDto: CreateTaskDto, attachmentTask: any): Task {
        const {title, description} = createTaskDto;
        console.log(attachmentTask)
        const task: Task = {
            id: uuidv1(),
            title,
            description,
            status: TaksStatus.OPEN,
            attachmentTask
        };

        this.tasks.push(task)
        return task;
    }

    deleteTask(id: string): void {
        const found = this.getTaskById(id);

        this.tasks = this.tasks.filter(task => task.id !== found.id);
        
    }

    updateTaskStatus(id: string, status: TaksStatus): Task {
      const task = this.getTaskById(id);
      task.status = status;

      return task;
        
    }
}
