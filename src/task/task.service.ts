import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './task.model';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    ) {}

    async addTask(
        name: string,
        userId: string,
        priority: string | number,
    ): Promise<Task> {
        const createdTask = this.taskModel.create({
            name,
            userId: new Types.ObjectId(userId),
            priority,
        });
        return createdTask;
    }

    async getTaskByName(name: string): Promise<Task | null> {
        return this.taskModel.findOne({ name }).exec();
    }

    async getUserTasks(userId: string): Promise<Task[]> {
        return this.taskModel
            .find({ userId: new Types.ObjectId(userId) })
            .exec();
    }

    async resetData(): Promise<void> {
        await this.taskModel.deleteMany({}).exec();
    }
}
