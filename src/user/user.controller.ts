import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    ConflictException,
    InternalServerErrorException,
    ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.model';
import { ParseEmailPipe } from '../common/pipes';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        const { email } = createUserDto;
        try {
            // Check if user already exists
            const existingUser = await this.userService.getUser(email);
            if (existingUser) {
                throw new ConflictException('User already exists');
            }

            // Create new user
            const createdUser = await this.userService.addUser(email);
            return createdUser;
        } catch (error) {
            // Handle errors
            if (error instanceof ConflictException) {
                throw new ConflictException('User already exists');
            }
            return new InternalServerErrorException();
        }
    }

    @Get(':email')
    async gerUser(@Param('email', ParseEmailPipe) email): Promise<User> {
        return this.userService.getUser(email);
    }
}
