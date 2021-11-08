const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://nang:' + process.env.MONGO_ATLAS_PW + '@freeseatscluster1.ps2zr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

/*
mongoose
    .connect('mongodb://127.0.0.1:27017/freeseats', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })
*/

console.log("Connected!")
const db = mongoose.connection
module.exports = db
