const express = require('express')

const freeseats_ctrl = require('../controllers/freeseats-ctrl')

const router = express.Router()

router.post('/freeseats', freeseats_ctrl.create_hub)

module.exports = router