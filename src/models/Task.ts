import mongoose, { Schema, Document, Types } from "mongoose";

const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'complete'
} as const

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

export interface ITask extends Document {
    taskName: string,
    description: string,
    project: Types.ObjectId,
    status: TaskStatus
}

const TaskSchema: Schema = new Schema({
    taskName: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    project: {
        type: Types.ObjectId,
        require: true,
        ref: 'Project'
    },
    status: {
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING
    }

}, { timestamps: true })

const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task