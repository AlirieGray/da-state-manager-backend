import mongoose from 'mongoose'
import { UserDocument } from '../user/user-model'

const Schema = mongoose.Schema

export interface ProtagonistDocument extends mongoose.Document {
    game: GameDocument['_id']
    name: String
    class: String
    origin: String
    companions: [String]
    romances: [String]
    rivals: [String]
    summary: String
    custom: Boolean
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
}

export interface WorldstateDocument extends mongoose.Document {
    user: UserDocument['_id']
    name: string
    summary: string
    wip: Boolean
    protagonist: [ProtagonistDocument]
    games: [GameDocument]
    createdAt: Date
    updatedAt: Date
}

const protagonistSchema = new Schema({
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
    name: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    companions: [String],
    romances: [String],
    friends: [String],
    rivals: [String],
    summary: {
        type: String,
        required: false
    },
    dao: {
        type: Boolean,
    },
    da2: {
        type: Boolean,
    },
    inquisition: {
        type: Boolean,
    },
    custom: {
        type: Boolean,
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

const mainQuestScehma = new Schema({
    name: {
        type: String
    },
    decisions: [decisionSchema]
})

const gameSchema = new Schema({
    name: {
        type: String
    },
    quests: [mainQuestScehma]
})

const WorldstateSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: false
    },
    wip: {
        type: Boolean,
        required: false
    },
    protagonists: [protagonistSchema],
    games: [gameSchema],
    fanWorks: [String]
}, { timestamps: true})

export default mongoose.model<WorldstateDocument>('Worldstate', WorldstateSchema)