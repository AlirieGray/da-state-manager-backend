import mongoose from 'mongoose'
import { UserDocument } from '../user/user-model'

const Schema = mongoose.Schema

/** TYPES **/
export interface ProtagonistDocument extends mongoose.Document {
    name: String
    class: String
    origin: String
    companions: [String]
    romances: [String]
    rivals: [String]
    summary: String
}

export interface DecisionDocument extends mongoose.Document {
    name: String
    choice: String
}

export interface MainQuestDocument extends mongoose.Document {
    name: String
    decisions: [DecisionDocument]
}

export interface GameDocument extends mongoose.Document {
    quest: [MainQuestDocument]
    protagonist: ProtagonistDocument
}

export interface WorldstateDocument extends mongoose.Document {
    user: UserDocument['_id']
    name: string
    summary: string
    imgLink: string
    wip: Boolean
    games: [GameDocument]
    createdAt: Date
    updatedAt: Date
}

/** SCHEMAS **/
const protagonistSchema = new Schema({
    name: {
        type: String,
    },
    class: {
        type: String,
    },
    origin: {
        type: String,
    },
    companions: [String],
    romances: [String],
    friends: [String],
    rivals: [String],
    summary: {
        type: String,
    }
})

const decisionSchema = new Schema({
    name: {
        type: String
    },
    choice: {
        type: String
    }
})

const mainQuestSchema = new Schema({
    name: {
        type: String
    },
    decisions: [decisionSchema]
})

const gameSchema = new Schema({
    name: {
        type: String
    },
    quests: [mainQuestSchema],
    protagonist: protagonistSchema
})

const WorldstateSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: {
        type: String,
        required: true
    },
    imgLink: {
        type: String,
    },
    summary: {
        type: String,
    },
    wip: {
        type: Boolean,
    },
    games: [gameSchema],
    fanWorks: [String]
}, { timestamps: true})

export default mongoose.model<WorldstateDocument>('Worldstate', WorldstateSchema)