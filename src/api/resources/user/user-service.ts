import User, { UserDocument } from './user-model'
import {omit} from 'lodash'
import { FilterQuery } from 'mongoose'
import UserModel from './user-model'

export async function validatePassword({email, password}: {email: string, password: string}) {
    const user = await User.findOne({email})

    if (!user) {
        return false
    }

    const isValid = await user.comparePassword(password)

    if (!isValid) {
        return false
    }

    return omit(user.toJSON(), 'password' )
}

export async function findUser(query: FilterQuery<UserDocument>) {
    return UserModel.findOne(query).lean(0)
}