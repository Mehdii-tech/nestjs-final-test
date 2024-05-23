import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, Types.ObjectId> {
    transform(value: any): Types.ObjectId {
        const validObjectId = Types.ObjectId.isValid(value);

        if (!validObjectId) {
            throw new BadRequestException('Invalid ObjectId');
        }

        return new Types.ObjectId(value);
    }
}

@Injectable()
export class ParseEmailPipe implements PipeTransform<string, string> {
    transform(value: string): string {
        if (!isEmail(value)) {
            throw new BadRequestException('Invalid email address');
        }
        return value;
    }
}
