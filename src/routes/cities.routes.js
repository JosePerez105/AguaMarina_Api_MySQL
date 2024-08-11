import { Router } from "express";
import { getCities, getCity, postCities, putCity, deleteCities } from "../controllers/cities.controller.js";

const router = Router();

router.get('/cities', getCities)
router.get('/cities/:id_city', getCity)
router.post('/cities', postCities)
router.put('/cities/:id_city', putCity)
router.delete('/cities/:id_city', deleteCities)

export default router