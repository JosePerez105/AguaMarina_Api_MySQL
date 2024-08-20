import { Router } from "express";
import { deleteCategories, getCategories, getCategory, postCategories, putCategories } from "../controllers/categories.controller.js";

const router = Router();

//Rutas de las categorias
router.get('/categories', getCategories)
router.get('/categories/:id', getCategory)
router.post('/categories', postCategories)
router.put('/categories', putCategories)
router.delete('/categories', deleteCategories)

export default router