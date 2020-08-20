import { Injectable } from '@nestjs/common';
import { Task, TaksStatus } from './tasks.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';


@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id)
    }

    createTasks(createTaskDto: CreateTaskDto): Task {
        const {title, description} = createTaskDto;
        const task: Task = {
            id: uuidv1(),
            title,
            description,
            status: TaksStatus.OPEN
        };

        this.tasks.push(task)
        return task;
    }

    deleteTask(id: string): void {
        
        this.tasks = this.tasks.filter(task => task.id !== id);
        
    }

    updateTaskStatus(id: string, status: TaksStatus): Task {
      const task = this.getTaskById(id);
      task.status = status;

      return task;
        
    }
}