import { Router } from "express";
import { getUsers, postUsers, putUsers, patchUserStatus, getUserById, getUserByMail } from "../controllers/users.controller.js";
import { authLogin, authenticateToken, checkPermission, sendVerificationCode, validateVerificationCode } from "../controllers/auth.controller.js";

const router = Router();

//Rutas de los usuarios
router.get('/users', [authenticateToken, checkPermission("Gestionar Usuarios")], getUsers)
router.get('/users/:id', [], getUserById)
router.get('/usersmail/', [], getUserByMail)
router.post('/users', [], postUsers)
router.put('/users/:id', [authenticateToken], putUsers)
router.patch('/users/:id', [authenticateToken, checkPermission("Gestionar Usuarios")], patchUserStatus)

//Rutas de login
router.post('/authlogin', [], authLogin)


//Generar Código de Verificación (Registro)
router.post('/sendverificationcode', [], sendVerificationCode)
//Validar Código de Verificación (Resgistro)
router.post('/validateverificationcode', [], validateVerificationCode)

export default router;