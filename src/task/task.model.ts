import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({
    timestamps: true,
    autoIndex: true,
    toJSON: { virtuals: true },
    id: false,
})
export class Task {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    userId: Types.ObjectId;

    @Prop({ required: true, min: 1, max: 5 })
    priority: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
TaskSchema.virtual('id').get(function () {
    return this._id.toString();
});
