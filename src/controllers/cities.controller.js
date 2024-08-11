import {pool} from '../db.js'

export const getCities = async(req, res) => {
    try {
        const [cities] = await pool.query('SELECT * FROM Cities')
        res.json(cities)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener ciudades"
        })
    }
}

export const getCity = async(req, res) => {
    const {id_city} = req.params
    try {
        const [cities] = await pool.query('SELECT * FROM Cities WHERE id_city = ?', [id_city])
        res.json(cities)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener la ciudad"
        })
    }
};

export const postCities = async(req, res) => {
    const {name} = req.body
    const [exists] = await pool.query('SELECT * FROM Cities WHERE name = ?', [name])
    if (exists.length > 0) {
        res.status(500).json({message : "Ciudad ya existente"})
    } else {
        try {
            const [cities] = await pool.query("INSERT INTO Cities (name) VALUES (?)", [name])
            res.json({
                id: cities.insertId,
                name
            })
        } catch (error) {
            return res.status(500).json({
                message : "Algo ha ido mal al registrar la ciudad"
            })
        }
    }
    
}

export const putCity = async(req, res) => {
    const {id_city} = req.params
    const {name} = req.body
    try {
        const [city] = await pool.query("UPDATE Cities SET name = IFNULL(?, name) WHERE id_city = ?", [name, id_city])
        if (city.affectedRows == 0) return res.status(404).json({
            message : "No se ha actualizado nada"
        })
        const [cities] = await pool.query("SELECT * FROM Cities WHERE id_city = ?", [id_city])
        res.json(cities)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al actualizar la ciudad"
        })
    }
}

export const deleteCities = async(req, res) => {
    const {id_city} = req.params
    try {
        const [city] = await pool.query("DELETE FROM Cities WHERE id_city = ?", [id_city])
        if (city.affectedRows <= 0) return res.status(404).json({
            message: "No se ha eliminado ninguna ciudad"
        })
        res.json({
            message : `Ciudad # ${id_city} eliminada`
        })
        console.log(city)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al eliminar la ciudad"
        })
    }
}