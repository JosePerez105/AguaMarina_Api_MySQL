import { Router } from "express";
import { getUsers, postUsers, putUsers, deleteUsers, getUser, patchUserStatus } from "../controllers/users.controller.js";

const router = Router();

router.get('/users', getUsers)
router.get('/users/:id', getUser)
router.post('/users', postUsers)
router.put('/users/:id', putUsers)
router.patch('/users/:id', patchUserStatus)
router.delete('/users/:id', deleteUsers)


export default router;