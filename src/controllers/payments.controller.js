import {pool} from '../db.js'

export const getPayments = async(req, res) => {
    try {
        const [payments] = await pool.query('SELECT * FROM PaymentRegisters')
        res.json(payments)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener los registros de pago"
        })
    }
}

export const getPayment = async(req, res) => {
    const {id_payment} = req.params
    try {
        const [payments] = await pool.query('SELECT * FROM PaymentRegisters WHERE id_payment = ?', [id_payment])
        res.json(payments)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener el registro de pago"
        })
    }
};

export const postPayments = async(req, res) => {
    const {id_rent, id_client, payment_date, payment_amount, description} = req.body
    try {
        const [payments] = await pool.query("INSERT INTO PaymentRegisters (id_rent, id_client, payment_date, payment_amount, description) VALUES (?, ?, ?, ?, ?)", [id_rent, id_client, payment_date, payment_amount, description])
        res.json({
            id: payments.insertId,
            id_rent, 
            id_client, 
            payment_date, 
            payment_amount, 
            description
        })
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al registrar el pago"
        })
    }
}

export const putPayment = async(req, res) => {
    const {id_payment} = req.params
    const {payment_date, payment_amount, description} = req.body
    try {
        const [payment] = await pool.query("UPDATE PaymentRegisters SET payment_date = IFNULL(?, payment_date), payment_amount = IFNULL(?, payment_amount), description = IFNULL(?, description) WHERE id_payment = ?", [payment_date, payment_amount, description, id_payment])
        if (payment.affectedRows == 0) return res.status(404).json({
            message : "No se ha actualizado nada"
        })
        const [payments] = await pool.query("SELECT * FROM PaymentRegisters WHERE id_payment = ?", [id_payment])
        res.json(payments)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al actualizar el registro de pago"
        })
    }
}

export const deletePayments = async(req, res) => {
    const {id_payment} = req.params
    try {
        const [payment] = await pool.query("DELETE FROM PaymentRegisters WHERE id_payment = ?", [id_payment])
        if (payment.affectedRows <= 0) return res.status(404).json({
            message: "No se ha eliminado ningun registro de pago"
        })
        res.json({
            message : `Registro de Pago # ${id_payment} eliminado`
        })
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al eliminar el registro de pago"
        })
    }
}