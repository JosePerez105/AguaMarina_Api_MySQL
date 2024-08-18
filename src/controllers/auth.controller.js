import {pool} from '../db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import '../config.js'

export const authLogin = async(req, res) => {
    const {mail, password} = req.body;

    try {
        const [resQuery] = await pool.query('SELECT * FROM Users WHERE mail = ?', [mail])
        const user = resQuery[0]
        const isMatch =  await bcrypt.compare(password, user.password)

        if (isMatch) {
            const accessToken = generateAccessToken(user)
            res.cookie('jwt', accessToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            })
            res.header('authorization', accessToken).json(
                {message : "Autenticado",
                    token : accessToken
                }
            )
        } else {
            res.status(404).json({"message" : "Inicio de Sesión Inválido"})
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