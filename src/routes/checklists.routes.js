import { Router } from "express";
import { getCheckList, getCheckListItems, getCheckLists, postCheckListItems, postCheckLists } from "../controllers/checklists.controller.js";

const router = Router();

//Rutas de las listas de Chequeo
router.get('/checklists', getCheckLists)
router.get('/checklists/:id_rent', getCheckList)
router.post('/checklists', postCheckLists)

//Rutas de los items de las listas de Chequeo
router.get('/checklistitems/:id_checklist', getCheckListItems)
router.post('/checklistitems', postCheckListItems)

export default router
