import mongoose, {Schema, Document,Types} from "mongoose";

export interface IToken extends Document {
   token: string;
   user:Types.ObjectId
   createdAt: Date;
}

const tokenSchema: Schema = new Schema({
    token:{
        type: String,
        required: true,
        trim: true,
    },
    user:{
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    expiresAt:{
        type: Date,
        default: Date.now,
        expires: "10m", // 1 hour in seconds or "1d" for 1 day or "10m" for 10 minutes 
    },
})
const Token = mongoose.model<IToken>('Token', tokenSchema);
export default Token;