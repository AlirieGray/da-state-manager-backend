import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
import User from './user-model'
import {omit} from 'lodash'

async function createUser (req: Request, res: Response, next: NextFunction) {
    const { username, email, password } = req.body
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username,
        email,
        password
    })

    return user.save()
        .then(user => res.status(201).json({user: omit(user.toJSON(), 'password')}))
        .catch(error => res.status(500).json(error))
}

async function readUser (req: Request, res: Response, next: NextFunction) {
    const userID = req.params.userID

    return User.findById(userID)
        .then(user => user ? res.status(200).json({user}) : res.status(404).json({ message: 'User not found'}))
        .catch(error => res.status(500).json({error}))
}

async function readAll (req: Request, res: Response, next: NextFunction) {
    return User.find()
        .then(users => res.status(200).json({users}))
        .catch(error => res.status(500).json({error}))
}

async function  updateUser (req: Request, res: Response, next: NextFunction) {
    const userID = req.params.userID

    return User.findById(userID)
        .then((user) => {
            if (user) {
                user.set(req.body)
                
                return user.save()
                    .then(user => res.status(201).json({user}))
                    .catch(error => res.status(500).json(error))
            } else {
                res.status(404).json({ message: 'User not found'})
            }
        })
        .catch(error => res.status(500).json(error))
}

async function deleteUser (req: Request, res: Response, next: NextFunction) {
    const userID = req.params.userID

    return User.findByIdAndDelete(userID)
        .then(user => user ? res.status(201).json({'message': 'User deleted'}) : res.status(404).json({ message: 'User not found'}))
        .catch(error => res.status(500).json({error}))
}

async function getCurrentUser (req: Request, res: Response) {
    return res.send(res.locals.user)
}

export default { createUser, readUser, readAll, updateUser, deleteUser, getCurrentUser }