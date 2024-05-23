import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { ParseObjectIdPipe } from '../common/pipes';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get('user/:userId')
    async getUserTasks(@Param('userId', ParseObjectIdPipe) userId) {
        return this.taskService.getUserTasks(userId);
    }

    @Post()
    async createTask(
        @Body(ValidationPipe) createTaskDto: CreateTaskDto,
    ): Promise<any> {
        const { name, userId, priority } = createTaskDto;
        const task = await this.taskService.addTask(name, userId, priority);
        return task;
    }
}
