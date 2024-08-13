import { Router } from "express";
import { getAllRents, getRent, getRentsUser, getRentsSeller, postRents, patchRentStatus, getRentDetails} from "../controllers/rents.controller.js";

const router = Router();

//Rutas de los alquileres
router.get('/rents', getAllRents)
router.get('/rents/:id_rent', getRent)
router.get('/rentsuser/:id_user', getRentsUser)
router.get('/rentsseller/:id_seller', getRentsSeller)
router.post('/rents', postRents)
router.patch('/rents/:id_rent', patchRentStatus)
router.get('/rentdetails/:id_rent', getRentDetails)

export default router;