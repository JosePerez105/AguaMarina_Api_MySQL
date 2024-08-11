import { Router } from "express";
import { getRoles, getRol, postRoles, putRoles, getPermission, getPermissionsRol, getAllPermissions, putPermissions} from "../controllers/roles.controller.js";

const router = Router();

//Rutas de los Roles
router.get('/roles', getRoles)
router.get('/roles/:id', getRol)
router.post('/roles', postRoles)
router.put('/roles/:id', putRoles)

//Rutas de los permisos
router.get('/permissions/:id_per', getPermission)
router.get('/permissions/', getAllPermissions)
router.get('/permissionsrol/:id_rol', getPermissionsRol)
router.put('/permissions', putPermissions)

export default router;