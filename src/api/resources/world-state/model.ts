import mongoose from 'mongoose'

const Schema = mongoose.Schema

const protagonistSchema = new Schema({
    // _id: Schema.ObjectID,
    name: {
        type: String,
        required: true
    },
    romances: [String],
    friends: [String],
    rivals: [String],
    summary: {
        type: String,
        required: false
    }
})



const worldStateSchema = new Schema({
    // _id: Schema.ObjectID,
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
    protagonists: [protagonistSchema]

}, { timestamps: true})

const WorldState = mongoose.model('WorldState', worldStateSchema)

// name
// id 
// wip (boolean)
// summary
// image link
// active
// fan works links
// protagonists
// main quests (per game)
// - each main quest has:
// multiple decisions
// companions brought
// summary/notes


// protagonists schema
// romance(s)
// 