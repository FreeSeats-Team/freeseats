const Chair = require('../models/freeseats-model')
const Hub = require('../models/freeseats-model')

create_hub = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a hub',
        })
    }

    const hub = new Hub(body)

    if (!hub) {
        return res.status(400).json({ success: false, error: err })
    }

    hub
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: hub._id,
                message: 'Hub created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Hub not created!',
            })
        })
}

// TODO: createSeat
// TODO: deleteSeat
// TODO: deleteHub

update_seat = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Hub.findOne({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Hub not valid!',
            })
        }

        return res.status(200).json({
            success: true,
            id: Hub._id,
            message: 'Update is in progress.',
        })
    })
}

// TODO: getFreeSeats
/*
getFreeSeats = async (req, res) => {
    await Hub.find({}, (err, movies) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!movies.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: movies })
    }).catch(err => console.log(err))
}
*/

module.exports = {
    create_hub,
    update_seat,
}

