import {pool} from '../db.js'

export const getVerificationCode = async (req, res) => {
    const {mail} = req.body

    try {
        const [results] = await pool.query('SELECT code, created_at FROM VerificationRegisters WHERE mail = ?', [mail]);
        console.log(results)
        res.json(results)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener el codigo de verificación"
        })
    }
}

export const postVerificationCode = async(req, res) => {
    const {mail, code} = req.body

    try {
        const [verification] = await pool.query('REPLACE INTO VerificationRegisters (mail, code, created_at) VALUES (?, ?, NOW())', [mail, code])
        res.json({
            mail: verification.insertId
        })
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al registrar el codigo de verificación"
        })
    }
}
