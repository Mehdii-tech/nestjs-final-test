import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async addUser(email: string): Promise<User> {
        const createdUser = await this.userModel.create({ email });
        return createdUser;
    }

    async getUser(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async resetData(): Promise<void> {
        await this.userModel.deleteMany({}).exec();
    }
}
