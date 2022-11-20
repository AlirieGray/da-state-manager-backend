import mongoose, {DateExpression, Document, Schema} from 'mongoose'
import { UserDocument } from '../resources/user/user-model'

export interface SessionDocument extends mongoose.Document {
    user: UserDocument['_id']
    valid: boolean
    userAgent: string
    createdAt: Date
    updatedAt: Date
}

const SessionSchema: Schema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    valid : {
        type: Boolean, default: true
    },
    userAgent: {
        type: String
    }
}, {versionKey: false, timestamps: true})


export default mongoose.model<SessionDocument>('Session', SessionSchema)