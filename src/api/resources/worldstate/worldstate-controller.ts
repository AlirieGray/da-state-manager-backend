import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
import Worldstate from './worldstate-model'

async function createWorldstate (req: Request, res: Response, next: NextFunction) {
    const { name, summary, wip, protagonists, dao, da2, dai, fanWorks } = req.body 

    const worldstate = new Worldstate({
        _id: new mongoose.Types.ObjectId(),
        name,
        summary,
        wip,
        protagonists,
        dao,
        da2,
        dai,
        fanWorks
    })

    return worldstate.save()
        .then(world => res.status(201).json(world))
        .catch(error => res.status(500).json(error))
    
}

// const readWorldstate = (req: Request, res: Response, next: NextFunction) => {
//     console.log(req)
// }