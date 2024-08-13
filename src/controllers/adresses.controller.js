import {pool} from '../db.js'

export const getAllAdresses = async(req, res) => {
    try {
        const [adresses] = await pool.query('SELECT * FROM Adresses')
        res.json(adresses)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener direcciones"
        })
    }
}

export const getAdressesUser = async(req, res) => {
    const {id_user} = req.params
    try {
        const [adresses] = await pool.query('SELECT * FROM Adresses WHERE id_user = ?', [id_user])
        res.json(adresses)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener direcciones"
        })
    }
};

export const getAdress = async(req, res) => {
    const {id_adress} = req.params
    try {
        const [adresses] = await pool.query("SELECT * FROM Adresses WHERE id_adress = ?", [id_adress])
        if (adresses.length <= 0) return res.status(404).json({
            message : "No se ha encontrado ninguna dirección"
        })
        res.json(adresses)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener la dirección"
        })
    }
}

export const postAdresses = async(req, res) => {
    const {id_user, adressText, city, neighborhood} = req.body
    try {
        const [adress] = await pool.query('INSERT INTO Adresses (id_user, adress, city, neighborhood) VALUES (?, ?, ?, ?)', [id_user, adressText, city, neighborhood])
        res.send({
            id: adress.insertId,
            id_user,
            adressText,
            city,
            neighborhood
        })
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al registrar la dirección"
        })
    }
}

export const putAdress = async(req, res) => {
    const {id_adress} = req.params
    const {adressText, city, neighborhood} = req.body
    try {
        const [adress] = await pool.query("UPDATE Adresses SET adress = IFNULL(?, adress), city = IFNULL(?, city), neighborhood = IFNULL(?, neighborhood) WHERE id_adress = ?", [adressText, city, neighborhood, id_adress])
        if (adress.affectedRows == 0) return res.status(404).json({
            message : "No se ha actualizado nada"
        })
        const [adresses] = await pool.query("SELECT * FROM Adresses WHERE id_adress = ?", [id_adress])
        res.json(adresses)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al actualizar la direccion"
        })
    }
}

export const deleteAdresses = async(req, res) => {
    const {id_adress} = req.params
    try {
        const [adress] = await pool.query("DELETE FROM Adresses WHERE id_adress = ?", [id_adress])
        if (adress.affectedRows <= 0) return res.status(404).json({
            message: "No se ha eliminado ninguna dirección"
        })
        res.json({
            message : `Dirección # ${id_adress} eliminada`
        })
        console.log(adress)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al eliminar la dirección"
        })
    }
}