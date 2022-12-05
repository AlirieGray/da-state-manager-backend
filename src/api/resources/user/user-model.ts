import mongoose, {DateExpression, Document, Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import { config } from '../../../config/config'

export interface UserDocument extends mongoose.Document {
    email: string
    username: string
    password: string
    createdAt: Date
    updateAt: DateExpression
    comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {versionKey: false, timestamps: true})

UserSchema.pre('save', async function(next) {
    let user = this as UserDocument

    if (!user.isModified('password')) {
        return next()
    }

    const salt = await bcrypt.genSalt(config.salt.saltWorkFactor)

    const hash = bcrypt.hashSync(user.password, salt)

    user.password = hash

    return next()
})

UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    const user = this as UserDocument

    return bcrypt.compare(candidatePassword, user.password).catch(e => false)
}

export default mongoose.model<UserDocument>('User', UserSchema)