import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    // @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    //     message: 'Email must be a valid email address',
    // })
    @IsEmail()
    email: string;
}
