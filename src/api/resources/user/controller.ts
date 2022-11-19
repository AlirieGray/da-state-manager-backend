import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
import User from './model'

const createUser = (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body
    console.log(username)
    console.log(req.body)
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username,
        email,
        password
    })

    return user.save()
        .then(user => res.status(201).json({user}))
        .catch(error => res.status(500).json(error))
}

const readUser = (req: Request, res: Response, next: NextFunction) => {
    const userID = req.params.userID

    return User.findById(userID)
        .then(user => user ? res.status(200).json({user}) : res.status(404).json({ message: 'User not found'}))
        .catch(error => res.status(500).json({error}))
}

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return User.find()
        .then(users => res.status(200).json({users}))
        .catch(error => res.status(500).json({error}))
}

const updateUser = (req: Request, res: Response, next: NextFunction) => {
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

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const userID = req.params.userID

    return User.findByIdAndDelete(userID)
        .then(user => user ? res.status(201).json({'message': 'User deleted'}) : res.status(404).json({ message: 'User not found'}))
        .catch(error => res.status(500).json({error}))
}

export default { createUser, readUser, readAll, updateUser, deleteUser}