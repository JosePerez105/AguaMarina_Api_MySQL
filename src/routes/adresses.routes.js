import { Router } from "express";
import { getAllAdresses, getAdresses, getAdress, postAdresses, putAdress, deleteAdresses } from "../controllers/adresses.controller.js";

const router = Router();

router.get('/adresses', getAllAdresses)
router.get('/adresses/:id_user', getAdresses)
router.get('/adresses/:id_adress', getAdress)
router.post('/adresses', postAdresses)
router.put('/adresses/:id_adress', putAdress)
router.delete('/adresses/:id_adress', deleteAdresses)

export default router