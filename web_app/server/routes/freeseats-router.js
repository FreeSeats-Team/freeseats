const express = require('express')

const freeseats_ctrl = require('../controllers/freeseats-ctrl')

const router = express.Router()

router.post('/freeseats/create_hub', freeseats_ctrl.create_hub)
router.post('/freeseats/create_seats', freeseats_ctrl.create_seats)
router.post('/freeseats/update_seats', freeseats_ctrl.update_seats)
router.post('/freeseats/delete_seats', freeseats_ctrl.delete_seats)
router.post('/freeseats/delete_hub', freeseats_ctrl.delete_hub)
router.get('/freeseats/get_free_seats', freeseats_ctrl.get_free_seats)

module.exports = router