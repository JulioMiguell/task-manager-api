import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TasksModule
  ],
})
export class AppModule {}
