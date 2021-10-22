const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Seat = new Schema({
        id: String,
        occupied: Boolean,
    }
)

const Hub = new Schema({
        id: String,
        seats: [Seat],
    }
)

module.exports = mongoose.model('seat', Seat)
module.exports = mongoose.model('hub', Hub)
