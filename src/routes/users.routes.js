import { Router } from "express";
import { getUsers, postUsers, putUsers, patchUserStatus, getUserById, getUserByMail } from "../controllers/users.controller.js";
import { authLogin, validateToken } from "../controllers/auth.controller.js";

const router = Router();

//Rutas de los usuarios
router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.get('users/mail', getUserByMail)
router.post('/users', postUsers)
router.put('/users/:id', putUsers)
router.patch('/users/:id', patchUserStatus)

//Rutas de login
router.post('/authlogin', [], authLogin)

export default router;