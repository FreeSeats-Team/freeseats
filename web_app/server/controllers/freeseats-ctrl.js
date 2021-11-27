const Seat = require('../models/freeseats-model')
const Hub = require('../models/freeseats-model')

/* 
 * create_hub will add a new hub to the cloud database
 */
create_hub = (req, res) => {
    const body = req.body
    console.log(typeof body)
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
            return res.status(200).json({
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

/*
 * create_seats will add a new seats to an existing hub
 * Given:
 * hub_id, array 'seats' of seats following Seats schema
 * function will add each seat to cloud database
*/
create_seats = (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide request body',
        })
    }

    hub_id = body.hub_id
    new_seats = body.seats

    Hub.findOne({ _id: hub_id }, (err, hub) => {
        if (err || hub == null) {
            return res.status(404).json({
                err,
                message: 'Hub_id ' + hub_id + ' not found!',
            })
        }

        for (var i = 0; i < new_seats.length; i++) {
            console.log(typeof new_seats[i])
            // seat = new Seat(new_seats[i])
            // For some reason this does not include the occupied field
            seat = new_seats[i]
            hub.seats.set(seat._id, seat)
        }

        hub
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    message: 'Seats created!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Seats not created!',
                })
            })
    })
}

/*
 * update_seats updates the status of a list of seats
 * Given:
 * hub_id, array 'seats' of fields: _id, occupied 
 * function will update each _id within hub_id's status to respective occupied value
*/
update_seats = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    hub_id = body.hub_id
    seat_updates = body.seats

    Hub.findOne({ _id: hub_id }, (err, hub) => {
        if (err || hub == null) {
            return res.status(400).json({
                err,
                message: 'Hub_id ' + hub_id + ' not found!',
            })
        }

        for (var i = 0; i < seat_updates.length; i++) {
            upd = seat_updates[i]
            if (!hub.seats.has(upd._id)) {
                return (res.status(400).json({
                    err,
                    message: 'Seat_id ' + upd._id + ' not found!',
                }))
            }
            seat = hub.seats.get(upd._id)
            seat.occupied = upd.occupied
            hub.seats.set(upd._id, seat)
        }

        hub
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    message: 'Seats updated!',
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Seats not updated!',
                })
            })
    })
}

/* 
 * delete_hub will delete hub based on hub_id
 */
delete_hub = (req, res) => {
    const body = req.body
    console.log(typeof body)
    if (!body || !body.hub_id) {
        return res.status(400).json({
            success: false,
            error: 'You must provide hub_id in body',
        })
    }

    Hub.remove({ _id: body.hub_id }, function(error) {
        if (!error) {
            return res.status(200).json({
                success: true,
                message: 'Hub deleted!',
            })
        }
        else {
            return res.status(404).json({
                error,
                message: 'Hub not deleted!',
            })
        }
    });
}

/*
 * delete_hub will delete seats from a hub based on seat_id's
 * Given:
 * hub_id, array 'seats' of seat_id's
 * function will remove each seat to cloud database
*/
delete_seats = (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide request body',
        })
    }

    hub_id = body.hub_id
    seats = body.seats

    Hub.findOne({ _id: hub_id }, (err, hub) => {
        if (err || hub == null) {
            return res.status(404).json({
                err,
                message: 'Hub_id ' + hub_id + ' not found!',
            })
        }

        for (var i = 0; i < seats.length; i++) {
            seat_id = seats[i]
            hub.seats.delete(seat_id)
        }

        hub
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    message: 'Seats deleted!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Seats not deleted!',
                })
            })
    })
}

/*
 * get_free_seats_by_hub will return an array of the free seats given a hub_id as a request query parameter
 *
 */
get_free_seats_by_hub = async (req, res) => {
    if (!req || !req.query || !req.query.hub_id) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a hub_id to update',
        })
    }

    hub_id = req.query.hub_id

    Hub.findOne({ _id: hub_id }, (err, hub) => {
        if (err || hub == null) {
            return res.status(404).json({
                err,
                message: 'Hub_id ' + hub_id + ' not found!',
            })
        }
        available_seats = new Map(
            [...hub.seats].filter(([_, seat]) => seat.occupied == false )
          );
        obj = Object.fromEntries(available_seats);
        return res
            .status(200)
            .json({ success: true, data: obj })
    })
}

/*
 * get_all_free_seats will return an array of the free seats given a hub_id as a request query parameter
 *
 */
get_all_free_seats = async (req, res) => {
    Hub.find({ }, (err, data) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Error.',
            })
        }
        for (var i = 0; i < data.length; i++) {
            available_seats = new Map(
                [...data[i].seats].filter(([_, seat]) => seat.occupied == false )
              );
            obj = Object.fromEntries(available_seats);
            data[i].seats = obj
        }
        return res
            .status(200)
            .json({ success: true, data: data })
    })
}

module.exports = {
    create_hub,
    create_seats,
    update_seats,
    delete_hub,
    delete_seats,
    get_free_seats_by_hub,
    get_all_free_seats,
}

