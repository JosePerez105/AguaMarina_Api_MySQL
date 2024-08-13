import { Router } from "express";
import { getAllAdresses, getAdressesUser, getAdress, postAdresses, putAdress, deleteAdresses } from "../controllers/adresses.controller.js";

const router = Router();

//Rutas de las Direcciones
router.get('/adresses', getAllAdresses)
router.get('/adresses/:id_user', getAdressesUser)
router.get('/adresses/:id_adress', getAdress)
router.post('/adresses', postAdresses)
router.put('/adresses/:id_adress', putAdress)
router.delete('/adresses/:id_adress', deleteAdresses)

export default router