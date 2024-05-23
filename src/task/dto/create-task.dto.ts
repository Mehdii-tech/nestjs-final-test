import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsMongoId()
    userId: string;

    @IsString()
    @IsNotEmpty()
    priority: string;
}
