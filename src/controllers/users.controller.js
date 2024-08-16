import {pool} from '../db.js'

export const getUsers = async(req, res) => {
    try {
        const [users] = await pool.query('SELECT * FROM Users')
        res.json(users)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener usuarios"
        })
    }
};

export const getUserById = async(req, res) => {
    const {id} = req.params
    try {
        const [users] = await pool.query("SELECT * FROM Users WHERE id_user = ?", [id])
        if (users.length <= 0) return res.status(404).json({
            message : "No se ha encontrado ningún usuario"
        })
        res.json(users)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener el usuario"
        })
    }
}

export const getUserByMail = async(req, res) => {
    const {mail} = req.body
    try {
        const [users] = await pool.query("SELECT * FROM Users WHERE mail = ?", [mail])
        if (users.length <= 0) return res.status(404).json({
            message : "No se ha encontrado ningún usuario con el correo proporcionado"
        })
        res.json(users)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener el usuario con el correo proporcionado"
        })
    }
}

export const postUsers = async(req, res) => {
    const {names, lastnames, dni, mail, password, phone_number, id_rol = 2, status = true} = req.body
    const [existente] = await pool.query('SELECT * FROM Users WHERE dni = ? OR mail = ? ', [dni, mail])
    if (existente.length > 0) {
        res.status(500).json({message : "Usuario con Email o DNI ya existente"})
    } else {
        try {
            const [user] = await pool.query('INSERT INTO Users (names, lastnames, dni, mail, password, phone_number, id_rol, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [names, lastnames, dni, mail, password, phone_number, id_rol, status])
            res.send({
                id: user.insertId,
                names,
                lastnames,
                dni,
                mail,
                password,
                phone_number,
                id_rol,
                status
            })
        } catch (error) {
            return res.status(500).json({
                message : "Algo ha ido mal al registrar el usuario"
            })
        }
    }
    
}

export const putUsers = async(req, res) => {
    const {id} = req.params
    const {names, lastnames, dni, mail, password, phone_number} = req.body
    try {
        const [user] = await pool.query("UPDATE Users SET names = IFNULL(?, names), lastnames = IFNULL(?, lastnames), dni = IFNULL(?, dni), mail = IFNULL(?, mail), password = IFNULL(?, password), phone_number = IFNULL(?, phone_number) WHERE id_user = ?", [names, lastnames, dni, mail, password, phone_number, id])
        if (user.affectedRows == 0) return res.status(404).json({
            message : "No se ha actualizado nada"
        })
        const [users] = await pool.query("SELECT * FROM Users WHERE id_user = ?", [id])
        res.json(users)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al actualizar el usuario"
        })
    }
}

export const patchUserStatus = async(req, res) => {
    const {id} = req.params
    try {
        const [users] = await pool.query("SELECT * FROM Users WHERE id_user = ?", [id])
        const newStatus = users[0].status == 1 ?  0 : 1;
        await pool.query("UPDATE Users SET status = ? WHERE id_user = ?", [newStatus, id])
        const [user] = await pool.query("SELECT * FROM Users WHERE id_user = ?", [id])
        res.json(user)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al cambiar el estado del usuario"
        })
    }
}