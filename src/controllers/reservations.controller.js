import {pool} from '../db.js'

export const getAllReservations = async(req, res) => {
    try {
        const [reservations] = await pool.query('SELECT * FROM Reservations')
        res.json(reservations)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener reservas"
        })
    }
};

export const getReservation = async(req, res) => {
    const {id_reservation} = req.params
    try {
        const [reservations] = await pool.query("SELECT * FROM Reservations WHERE id_reservation = ?", [id_reservation])
        if (reservations.length <= 0) return res.status(404).json({
            message : "No se ha encontrado ninguna reserva"
        })
        res.json(reservations)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener la reserva"
        })
    }
};

export const getReservationsUser = async(req, res) => {
    const {id_user} = req.params
    try {
        const [reservations] = await pool.query('SELECT * FROM Reservations WHERE id_user = ?', [id_user])
        res.json(reservations)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener las reservas del Usuario"
        })
    }
};

export const postReservations = async(req, res) => {
    const {id_user, start_date, end_date, adress, city, neighborhood, id_status = 1} = req.body
    console.log(req.body)
    try {
        const [reservation] = await pool.query('INSERT INTO Reservations (id_user, start_date, end_date, adress, city, neighborhood, id_status) VALUES (?, ?, ?, ?, ?, ?, ?)', [id_user, start_date, end_date, adress, city, neighborhood, id_status])
        res.json({
            id: reservation.insertId,
            start_date, 
            end_date, 
            adress, 
            city, 
            neighborhood, 
            id_status
        })
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al registrar la reserva",
            error
        })
    }
};

export const patchReservationStatus = async(req, res) => {
    const {id_reservation} = req.params
    const {id_status} = req.body
    try {
        await pool.query("UPDATE Reservations SET id_status = ? WHERE id_reservation = ?", [id_status, id_reservation])
        const [reservation] = await pool.query("SELECT * FROM Reservations WHERE id_reservation = ?", [id_reservation])
        res.json(reservation)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al cambiar el estado de la reserva"
        })
    }
};

export const getReservationDetails = async(req, res) => {
    const {id_reservation} = req.params
    try {
        const [reservationDetails] = await pool.query('SELECT * FROM ReservationDetails WHERE id_reservation = ?', [id_reservation])
        res.json(reservationDetails)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener detalles de la reserva"
        })
    }
};

export const postReservationDetails = async(req, res) => {
    const {id_reservation, id_product, quantity, total_price} = req.body
    try {
        const [reservationDetails] = await pool.query('INSERT INTO ReservationDetails (id_reservation, id_product, quantity, total_price) VALUES(?, ?, ?, ?)', [id_reservation, id_product, quantity, total_price])
        res.json({
            id_reservation, 
            id_product, 
            quantity, 
            total_price,

            reservationDetails
        })
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al registrar detalles de la reserva"
        })
    }

};