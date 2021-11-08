const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const freeseats_router = require('./routes/freeseats-router')

const app = express()
const api_port = process.env.PORT || 3000


app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    console.log("Got request!");
    res.send('Up and running!')
})

app.use('/api', freeseats_router)

app.listen(api_port, () => console.log(`Server running on port ${api_port}`))

console.log("index.js working!")
