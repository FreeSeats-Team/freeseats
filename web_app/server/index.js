const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const freeseats_router = require('./routes/freeseats-router')

const app = express()
const api_port = 3000

app.use(cors())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', freeseats_router)

app.listen(api_port, () => console.log(`Server running on port ${api_port}`))
