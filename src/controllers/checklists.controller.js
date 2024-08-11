import {pool} from '../db.js'

export const getCheckLists = async (req,res) => {
    try {
        const [checklists] = await pool.query('SELECT * FROM CheckLists')
        res.json(checklists)
    } catch(error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener las listas de chequeo"
        })
    }
}

export const getCheckList = async (req, res) => {
    const {id_rent} = req.params
    try {
        const [checklists] = await pool.query('SELECT * FROM CheckLists WHERE id_rent = ?', [id_rent])
        if (checklists.length <= 0) return res.status(404).json({
            message : "No se ha encontrado ninguna lista de chequeo del alquiler"
        })
        res.json(checklists)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener la lista de chequeo del alquiler"
        })
    }
}

export const postCheckLists = async(req, res) => {
    const {id_rent, description} = req.body
    try {
        const [checklist] = await pool.query('INSERT INTO CheckLists (id_rent, description) VALUES (?, ?)', [id_rent, description])
        res.send({
            id: checklist.insertId,
            id_rent,
            description
        })
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al registrar la lista de chequeo"
        })
    }
}

export const getCheckListItems = async(req, res) => {
    const {id_checklist} = req.params
    try {
        const [checklistitems] = await pool.query('SELECT * FROM CheckListItems WHERE id_checklist = ?', [id_checklist])
        res.json(checklistitems)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener los items de la lista de chequeo"
        })
    }
}

export const postCheckListItems = async(req, res) => {
    const {id_checklist} = req.params
    const {id_product, total_quantity, bad_quantity} = req.body
    try {
        const [checklistitem] = await pool.query('INSERT INTO CheckListItems (id_checklist, id_product, total_quantity, bad_quantity) VALUES (?, ?, ?, ?)', [id_checklist, id_product, total_quantity, bad_quantity])
        res.send({
            id: checklistitem.insertId,
            id_checklist,
            id_product,
            total_quantity,
            bad_quantity
        })
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al registrar el item de la lista de chequeo"
        })
    }
}

