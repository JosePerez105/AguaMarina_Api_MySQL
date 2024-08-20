import {pool} from '../db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import '../config.js'
import { getUserByIdFunc } from './users.controller.js'
import { getRolePermissionsFunc } from './roles.controller.js'


export const authLogin = async(req, res) => {
    const {mail, password} = req.body;

    try {
        const [resQuery] = await pool.query('SELECT * FROM Users WHERE mail = ?', [mail])
        if (resQuery.length <= 0) {
            res.status(400).json({
                message : "No existe una cuenta con este correo",
            })
        }
        const user = resQuery[0]
        const isMatch =  await bcrypt.compare(password, user.password)

        if (isMatch) {
            const accessToken = generateAccessToken(user)
            await res.cookie('jwt', accessToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            })
            await res.header('authorization', accessToken).json({
                    message : "Inicio de Sesión Correcto",
                    data : user,
                    isLogin : True
                }
            )
        } else {
            await res.status(400).json({
                message : "Contraseña Incorrecta",
            })
        }

    }catch {
        console.log("Hay un error")
        return res.status(500).json({
            message : "Ocurrió un error en el servidor"
        })
    }

}

export function generateAccessToken(data) {
    return  jwt.sign(data, process.env.SECRET_JWT, {expiresIn : '30m'})

}

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt;
  
    if (!token) {
      return res.status(401).json({ message: 'No Autorizado para esta función' });
    }
  
    jwt.verify(token, process.env.SECRET_JWT, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'El Token proporcionado no es válido' });
      }
      console.log('Token Válido')
      req.user = user;
      next();
    });
};

export const checkPermission = (requiredPermission) => {
    return async (req, res, next) => {
      try {
        const id_user = req.user.id_user; 
        console.log(id_user)
        const user = await getUserByIdFunc(id_user);
        console.log(user)
        if (!user) {
          return res.status(401).json({ message: 'Usuario no encontrado' });
        }
  
        const permissions = await getRolePermissionsFunc(user.id_rol);
        console.log("Permisos chequeados: ", permissions)
  
        if (!permissions.includes(requiredPermission)) {
          return res.status(403).json({ message: 'No tienes permisos para entrar aquí' });
        }
  
        next();
      } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
      }
    };
  };

//Funciones y Métodos para enviar código de verificación
//Código para generar un número de 6 Dígitos
export const generateCode = () => {
    return Math.floor(Math.random() * 900000 + 100000)
}

//Transportador de Gmail
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASS_APP_MAIL,
    },
});

// Función para enviar el correo según las opciones
export const sendMail = async (options, mail, code) => {
    const salt = await bcrypt.genSalt(10);
    const code_bcrypt = await bcrypt.hash(code.toString(), salt);
    

    try {
        await transporter.sendMail(options);

        const [verification] = await pool.query('REPLACE INTO VerificationRegisters (mail, code, created_at) VALUES (?, ?, NOW())', [mail, code_bcrypt]);
        
        return { success: true, mailId: verification.insertId };
    } catch (error) {
        throw new Error('No se ha podido enviar el Código de Verificación');
    }
};

// Generar la estructura del correo (Esta será la ruta del fetch POST)
export const sendVerificationCode = async (req, res) => {
    const { mail } = req.body;
    const code = generateCode();
    const mailOptions = {
        from: process.env.USER_MAIL,
        to: mail,
        subject: `Código de Verificación AguaMarina ${code}`,
        html: `<!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Correo Electrónico</title>
                    <style>
                        body {
                            background-color: #f2f2f2;
                            margin: 0;
                            padding: 0;
                            font-family: Arial, sans-serif;
                        }
                        .all {
                            background-color: #00747C;
                            text-align: center;
                            justify-content: center;
                            margin: 0 auto;
                            min-width: 400px;
                            max-width: 500px;
                            min-height: 500px;
                            padding: 10px;
                            border-radius: 8px;
                        }
                        .container {
                            background-color: #202022;
                            margin: 0 auto;
                            min-width: 400px;
                            max-width: 500px;
                            min-height: 500px;
                            border-radius: 8px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            text-align: center;

                        }
                        .header {
                            background-color: #00747C;
                            color: white;
                            padding: 20px;
                            border-radius: 8px 8px 0 0;
                        }
                        .header h1 {
                            margin: 0;
                            font-size: 30px;
                        }
                        .content {
                            padding: 20px;
                        }
                        .content p {
                            font-size: 18px;
                            color: #f2f2f2;
                            line-height: 1.5;
                            margin: 20px 0;
                        }
                        .verification-code {
                            font-size: 32px;
                            font-weight: bold;
                            letter-spacing: 2px;
                            color: #000000;
                            background-color: #00747C;
                            padding: 10px 20px;
                            border-radius: 5px;
                            display: inline-block;
                            margin: 20px 0;
                        }
                        .verification-code-ag {
                            font-size: 32px;
                            font-weight: bold;
                            letter-spacing: 2px;
                            color: #ffffff;
                            padding: 10px 6px;
                            border-radius: 5px;
                            display: inline-block;
                            margin: 20px 0;
                            justify-self: end;
                        }
                        .btn {
                            display: inline-block;
                            padding: 12px 25px;
                            font-size: 16px;
                            color: white;
                            background-color: #4CAF50;
                            text-decoration: none;
                            border-radius: 5px;
                            margin-top: 20px;
                        }
                        .footer {
                            margin-top: 50px;
                            font-size: 12px;
                            color: #777;
                        }
                    </style>
                </head>
                <body>
                    <div class="all">
                        <div class="header">
                            <h1>Bienvenido a AguaMarina!!</h1>
                        </div>
                        <div class="container">
                        
                        <div class="content">
                            <p>¡Gracias por unirte a nuestra comunidad! Estamos emocionados de tenerte con nosotros.</p>
                            <p>Tu código de verificación es:</p>
                            <div class="verification-code-ag">AG-</div>
                            <div class="verification-code">${code}</div>
                            <p>Utiliza este código para verificar de que éste es tu correo para seguir con tu registro</p>
                        </div>
                        <div class="footer">
                            <p>Si no solicitaste este correo, por favor ignóralo.</p>
                            <p>&copy; 2024 AguaMarina. Todos los derechos reservados.</p>
                        </div>
                    </div>
                    </div>
                </body>
                </html>
                `
    };
    try {
        const result = await sendMail(mailOptions, mail, code);
        return res.json({ message: 'Correo Enviado Correctamente', info: result });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

//Validar Código del input con la base de datos
export const validateVerificationCode = async (req, res) => {
    const { mail, code } = req.body;
    const codeStr = code.toString()
    try {
        const [verification] = await pool.query('SELECT code FROM VerificationRegisters WHERE mail = ?', [mail]);

        if (verification.length === 0) {
            return res.status(404).json({ message: 'No se encontró un código para este correo' });
        }

        const storedCode = verification[0].code;
        const isMatch = await bcrypt.compare(codeStr, storedCode);
        if (!isMatch) {
            return res.status(200).json({ message: 'Código de verificación incorrecto', isCorrect: false});
        }

        return res.status(200).json({ message: 'Código de verificación correcto', isCorrect: true });
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor al validar el código' });
    }
};