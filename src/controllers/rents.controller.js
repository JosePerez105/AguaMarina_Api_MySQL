import {pool} from '../db.js'

export const getAllRents = async(req, res) => {
    try {
        const [rents] = await pool.query('SELECT * FROM Rents')
        res.json(rents)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener alquileres"
        })
    }
};

export const getRent = async(req, res) => {
    const {id_alquiler} = req.params
    try {
        const [rents] = await pool.query("SELECT * FROM Rents WHERE id_alquiler = ?", [id_alquiler])
        if (rents.length <= 0) return res.status(404).json({
            message : "No se ha encontrado ningún alquiler"
        })
        res.json(rents)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener el alquiler"
        })
    }
};

export const getRentsUser = async(req, res) => {
    const {id_user} = req.params
    try {
        const [reservations] = await pool.query('SELECT * FROM Rents WHERE id_reservation IN (SELECT id_reservation FROM Reservations WHERE id_user = ?)', [id_user])
        res.json(reservations)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener los alquileres del Usuario"
        })
    }
};

export const getRentsSeller = async(req, res) => {
    const {id_seller} = req.params
    try {
        const [rents] = await pool.query('SELECT * FROM Rents WHERE id_seller = ?', [id_seller])
        res.json(rents)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener los alquileres del Usuario"
        })
    }
};

export const postRents = async(req, res) => {
    const {id_reservation, id_seller, id_status = 1} = req.body
    try {
        const [rents] = await pool.query('INSERT INTO Rents (id_reservation, id_seller, id_status) VALUES (?, ?, ?)', [id_reservation, id_seller, id_status])
        res.send({
            id: rents.insertId,
            id_reservation,
            id_seller,
            id_status
        })
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al registrar el alquiler"
        })
    }
    
};

export const patchRentStatus = async(req, res) => {
    const {id_rent} = req.params
    const {id_status} = req.body
    try {
        await pool.query("UPDATE Rents SET id_status = ? WHERE id_rent = ?", [id_status, id_rent])
        const [rent] = await pool.query("SELECT * FROM Rents WHERE id_rent = ?", [id_rent])
        res.json(rent)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al cambiar el estado del alquiler"
        })
    }
};

export const getRentDetails = async(req, res) => {
    const {id_rent} = req.params
    try {
        const [rentDetails] = await pool.query('SELECT * FROM ReservationDetails WHERE id_reservation = (SELECT id_reservation FROM Rents WHERE id_rent = ?)', [id_rent])
        res.json(rentDetails)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener detalles del alquiler"
        })
    }
};