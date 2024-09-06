import { Router } from "express";
import { getRoles, getRol, postRoles, putRoles, getPermission, getRolePermissions, getAllPermissions, putPermissions, deletePermission} from "../controllers/roles.controller.js";

const router = Router();

//Rutas de los Roles
router.get('/roles', getRoles)
router.get('/roles/:id', getRol)
router.post('/roles', postRoles)
router.put('/roles/:id', putRoles)
router.delete('/roles/:id_per', deletePermission)

//Rutas de los permisos
router.get('/permissions/:id_per', getPermission)
router.get('/permissions/', getAllPermissions)
router.get('/permissionsrol/:id_rol', getRolePermissions)
router.put('/permissions', putPermissions)

export default router;