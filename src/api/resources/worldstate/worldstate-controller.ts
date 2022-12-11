import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
import WorldState from './worldstate-model'

async function createWorldState (req: Request, res: Response, next: NextFunction) {
    const { name, summary, wip, games, fanWorks } = req.body 
    const userID = res.locals.user._id

    const worldstate = new WorldState({
        _id: new mongoose.Types.ObjectId(),
        user: userID,
        name,
        summary,
        wip,
        games,
        fanWorks
    })

    return worldstate.save()
        .then(world => res.status(201).json(world))
        .catch(error => res.status(500).json({error}))
}

async function readAll (req: Request, res: Response, next: NextFunction) {
    return WorldState.find()
        .then(worlds => res.status(200).json(worlds))
        .catch(error => res.status(500).json({error}))
}

async function readWorldstate (req: Request, res: Response, next: NextFunction) {
    const worldID = req.params.worldID
    return WorldState.findById(worldID)
        .then(world => world? res.status(200).json(world) : res.status(404).json({ message: 'Worldstate not found'}))
        .catch(error => res.status(500).json({error}))
}

async function updateWorldstate (req: Request, res: Response, next: NextFunction) {
    const worldID = req.params.worldID

    return WorldState.findById(worldID)
        .then((world) => {
            if (world) {
                world.set(req.body)
                
                return world.save()
                    .then(world => res.status(200).json({world}))
                    .catch(error => res.status(500).json(error))
            } else {
                res.status(404).json({ message: 'World state not found'})
            }
        })
        .catch(error => res.status(500).json(error))
}

async function deleteWorldState (req: Request, res: Response, next: NextFunction) {
    const worldID = req.params.worldID

    return WorldState.findByIdAndDelete(worldID)
        .then(world => world ? res.status(201).json({'message': 'Worldstate deleted'}) : res.status(404).json({ message: 'World state not found'}))
        .catch(error => res.status(500).json({error}))
}

export default { createWorldState, readAll, updateWorldstate, readWorldstate, deleteWorldState }