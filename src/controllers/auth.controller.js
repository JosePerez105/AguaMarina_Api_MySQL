import {pool} from '../db.js'
import jwt from 'jsonwebtoken'
import '../config.js'

export const authLogin = async(req, res) => {
    const {mail, password} = req.body;

    try {
        const [resQuery] = await pool.query('SELECT * FROM Users WHERE mail = ?', [mail])
        const user = resQuery[0]
        console.log(user.password)

        if (user.password == password) {
            const accessToken = generateAccessToken(user)
            console.log(accessToken)
            res.header('authorization', accessToken).json(
                {message : "Autenticado",
                    token : accessToken
                }
            ).cookie('jwt', accessToken)
        } else {
            res.json({"message" : "Incorrecto"})
        }

    }catch {
        console.log("Hay un error")
        return res.status(500).json({
            message : "Ocurrió un error en el servidor"
        })
    }

}

export function generateAccessToken(data) {
    return jwt.sign(data, process.env.SECRET_JWT, {expiresIn : '30m'})

}

export const validateToken = async(req, res, next) => {
    const accessToken = req.headers['authorization'];
    if(!accessToken) res.json({message : "Acceso Denegado"});
    jwt.verify(accessToken, process.env.SECRET_JWT, (err, data) => {
        if (err) {
            res.json({
                message : "Acceso Denegado, Token expirado o Incorrecto"
            })
        } else {
            next()
        }
    })

}