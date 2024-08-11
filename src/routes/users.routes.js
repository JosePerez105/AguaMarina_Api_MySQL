import { Router } from "express";
import { getUsers, postUsers, putUsers, deleteUsers, getUser, patchUserStatus } from "../controllers/users.controller.js";
import { authLogin, validateToken } from "../controllers/auth.controller.js";

const router = Router();

router.get('/users', getUsers)
router.get('/users/:id', getUser)
router.post('/users', postUsers)
router.put('/users/:id', putUsers)
router.patch('/users/:id', patchUserStatus)
router.delete('/users/:id', deleteUsers)
router.get('/authlogin', authLogin)

export default router;