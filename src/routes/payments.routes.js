import { Router } from "express";
import { getPayments, getPayment, postPayments, putPayment, deletePayments } from "../controllers/payments.controller.js";

const router = Router();

//Rutas de los registros de pago
router.get('/payments', getPayments)
router.get('/payments/:id_payment', getPayment)
router.post('/payments', postPayments)
router.put('/payments/:id_payment', putPayment)
router.delete('/payments/:id_payment', deletePayments)

export default router;