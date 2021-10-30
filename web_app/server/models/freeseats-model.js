const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Seat = new Schema({
        _id: String,
        occupied: Boolean,
    }
)

const Hub = new Schema({
        _id: String,
        seats: {
            type: Map, 
            of: Seat
        }
    }
)

module.exports = mongoose.model('seat', Seat)
module.exports = mongoose.model('hub', Hub)
