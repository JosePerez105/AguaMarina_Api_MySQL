import { Router } from "express";
import { getCategories, getCategory, postCategories, putCategories } from "../controllers/categories.controller.js";

const router = Router();

//Rutas de las categorias
router.get('/categories', getCategories)
router.get('/categories/:id', getCategory)
router.post('/categories', postCategories)
router.put('/categories/:id', putCategories)

export default router