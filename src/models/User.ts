import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    username: string;
    confirmed: boolean;
}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true}
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
