import { Router } from "express";
import { deletePurchases, getAllPurchases, getPurchase, getPurchaseDetails, getPurchasesBuyer, postPurchaseDetails, postPurchases, putPurchaseDetails } from "../controllers/purchases.controller.js";


const router = Router();

//Rutas de las compras
router.get('/purchases', getAllPurchases);
router.get('/purchases/:id_purchase', getPurchase);
router.get('/purchasesuser/:id_buyer', getPurchasesBuyer);
router.post('/purchases', postPurchases)
router.delete('/purchases/:id_purchase', deletePurchases);

//Rutas de los detalles de las compras
router.get('/purchasedetails/:id_purchase', getPurchaseDetails);
router.post('/purchasedetails', postPurchaseDetails)
router.put('/purchasedetails', putPurchaseDetails)

export default router;