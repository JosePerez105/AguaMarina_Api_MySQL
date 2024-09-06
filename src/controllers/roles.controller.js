import {pool} from '../db.js'

export const getRoles = async(req, res) => {
    try {
        const [roles] = await pool.query('SELECT * FROM Roles')
        res.json(roles)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener los roles"
        })
    }
};

export const getRol = async(req, res) => {
    const {id} = req.params
    try {
        const [roles] = await pool.query("SELECT * FROM Roles WHERE id_rol = ?", [id])
        if (roles.length <= 0) return res.status(404).json({
            message : "No se ha encontrado ningún Rol"
        })
        res.json(roles)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener el rol"
        })
    }
}

export const postRoles = async(req, res) => {
    const {name, description, id_perms = []} = req.body
    const [exists] = await pool.query('SELECT * FROM Roles WHERE name = ?', [name])
    if (exists.length > 0) {
        res.status(500).json({message : "Rol ya existente"})
    } else {
        try {
        
            const [rol] = await pool.query('INSERT INTO Roles (name, description) VALUES (?, ?)', [name, description])
    
            if (id_perms.length > 0) {
                const inserts = id_perms.map(id_permission => [rol.insertId, id_permission]);
                await pool.query('INSERT INTO RolePermissions (id_rol, id_permission) VALUES ?', [inserts]);
            }
    
            res.send({
                id: rol.insertId,
                name,
                description
            })
        } catch (error) {
            return res.status(500).json({
                message : "Algo ha ido mal al registrar el rol"
            })
        }
    }

    
}

export const putRoles = async(req, res) => {
    const {id} = req.params
    const {name, description} = req.body
    try {
        const [rol] = await pool.query("UPDATE Roles SET name = IFNULL(?, name), description = IFNULL(?, description) WHERE id_rol = ?", [name, description, id])
        if (rol.affectedRows == 0) return res.status(404).json({
            message : "No se ha actualizado nada"
        })
        const [roles] = await pool.query("SELECT * FROM Roles WHERE id_rol = ?", [id])
        res.json(roles)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al actualizar el Rol"
        })
    }
}

export const getPermission = async(req, res) => {
    const {id_per} = req.params
    try {
        const [permission] = await pool.query('SELECT * FROM Permissions WHERE id_permission IN (?)', [id_per]);
        res.json(permission)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener el Permiso"
        })
    }

}
export const deletePermission = async(req, res) => {
    const {id_per} = req.params
    try {
        const [permission] = await pool.query('DELETE * FROM Permissions WHERE id_permission IN (?)', [id_per]);
        res.json(permission)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al eliminar el Permiso"
        })
    }

}

export const getRolePermissions = async(req, res) => {
    const {id_rol} = req.params

    try {
        const [permissions] = await pool.query('SELECT * FROM RolePermissions WHERE id_rol = ?', [id_rol])
        res.json(permissions)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener los permisos del Rol"
        })
    }
}

export const getAllPermissions = async (req, res) => {
    try {
        const [permissions] = await pool.query('SELECT * FROM Permissions')
        res.json(permissions)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener los permisos"
        })
    }
}

export const putPermissions = async(req, res) => {
    const {id_rol, id_perms = []} = req.body
    try {
        const [permissionsTrue] = await pool.query('SELECT * FROM RolePermissions WHERE id_rol = ?', [id_rol])

        const permissionsTrueIds = permissionsTrue.map(per => per.id_permission)

        const permissionsToAdd = id_perms.filter(id_permission => !permissionsTrueIds.includes(id_permission))

        const permissionstoRemove = permissionsTrueIds.filter(id_permission => !id_perms.includes(id_permission))

        if (permissionsToAdd.length > 0) {
            const inserts = permissionsToAdd.map(id_permission => [id_rol, id_permission]);
            await pool.query('INSERT INTO RolePermissions (id_rol, id_permission) VALUES ?', [inserts]);
        }

        if (permissionstoRemove.length > 0) {
            await pool.query('DELETE FROM RolePermissions WHERE id_rol = ? AND id_permission IN (?)', [id_rol, permissionstoRemove])
        }

        res.json({
            message: "Permisos actualizados correctamente"
        })

    } catch (error) {
        return res.status(500).json({
            message : "Error al actualizar los Permisos"
        })
    }
}


//Funciones

export const getRolePermissionsFunc = async (id_rol) => {
    try {
        const [permissions] = await pool.query('SELECT p.name FROM Permissions p INNER JOIN RolePermissions rp ON p.id_permission = rp.id_permission WHERE rp.id_rol = ?', [id_rol])
        if (permissions.length <= 0) {
            return null
        }
        return permissions.map(permission => permission.name)
    } catch (error) {
        console.error("Error al obtener los permisos del rol", error)
        throw new Error("Error del servidor")
    }
}
