const Schema = mongoose.Schema

const worldStateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    wip: {
        type: Boolean,
        required: false
    }
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
// 