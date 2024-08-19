import {pool} from '../db.js'

export const getCategories = async (req,res) => {
    try {
        const [categories] = await pool.query('SELECT * FROM Categories')
        res.status(200).json(categories)
    } catch(error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener las categorias"
        })
    }
}

export const getCategory = async (req, res) => {
    const {id} = req.params
    try {
        const [categories] = await pool.query('SELECT * FROM Categories WHERE id_category = ?', [id])
        if (categories.length <= 0) return res.status(404).json({
            message : "No se ha encontrado ninguna categoria"
        })
        res.json(categories)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener la categoria"
        })
    }
}

export const postCategories = async(req, res) => {
    const {name} = req.body
    try {
        const [category] = await pool.query('INSERT INTO Categories (name) VALUES (?)', [name])
        res.status(200).json({
            id: category.insertId,
            name
        })
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al registrar la categoria"
        })
    }
}

export const putCategories = async(req, res) => {
    const {id, name} = req.body
    try {
        const [category] = await pool.query("UPDATE Categories SET name = IFNULL(?, name) WHERE id_category = ?", [name, id])
        if (category.affectedRows == 0) return res.status(404).json({
            message : "No se ha actualizado nada"
        })
        const [categories] = await pool.query("SELECT * FROM Categories WHERE id_category = ?", [id])
        res.json(categories)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al actualizar la categoria"
        })
    }
}