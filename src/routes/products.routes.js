import { Router } from "express";
import { getProducts, getProduct, postProducts, putProduct, patchProductStatus, getAllImages, getImage, getImagesProduct, postImages, deleteImages} from "../controllers/products.controller.js";

const router = Router();

//Rutas de los productos
router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.post('/products', postProducts);
router.put('/products/:id', putProduct);
router.patch('/products/:id', patchProductStatus);

//Rutas de las imagenes
router.get('/images', getAllImages);
router.get('/images/:id_image', getImage);
router.get('/images/:id_product', getImagesProduct);
router.post('/images', postImages);
router.delete('/images/:id_image', deleteImages);

export default router;