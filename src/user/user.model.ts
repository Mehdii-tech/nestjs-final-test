import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
    timestamps: true,
    autoIndex: true,
    toJSON: { virtuals: true },
    id: false,
})
export class User {
    @Prop({ required: true, unique: true })
    email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.virtual('id').get(function () {
    return this._id.toString();
});
