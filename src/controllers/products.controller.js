import {pool} from '../db.js'

export const getProducts = async(req, res) => {
    try {
        const [products] = await pool.query('SELECT * FROM Products')
        res.json(products)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener productos"
        })
    }
}

export const getProduct = async(req, res) => {
    const {id} = req.params
    try {
        const [products] = await pool.query('SELECT * FROM Products WHERE id_product = ?', [id])
        res.json(products)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener el producto"
        })
    }
};

export const postProducts = async(req, res) => {
    const {name, total_quantity, price, description, id_category, status = true} = req.body
    const [exists] = await pool.query('SELECT * FROM Products WHERE name = ?', [name])
    if (exists.length > 0) {
        res.status(500).json({message : "Producto ya existente"})
    } else {
        try {
            const [products] = await pool.query("INSERT INTO Products (name, total_quantity, price, description, id_category, status) VALUES (?, ?, ?, ?, ?, ?)", [name, total_quantity, price, description, id_category, status])
            res.json({
                id: products.insertId,
                name, total_quantity,
                price,
                description,
                id_category,
                status
            })
        } catch (error) {
            return res.status(500).json({
                message : "Algo ha ido mal al registrar el producto"
            })
        }
    }
}

export const putProduct = async(req, res) => {
    const {id} = req.params
    const {name, total_quantity, price, description, id_category, status} = req.body
    try {
        const [product] = await pool.query("UPDATE Products SET name = IFNULL(?, name), total_quantity = IFNULL(?, total_quantity), price = IFNULL(?, price), description = IFNULL(?, description), id_category = IFNULL(?, id_category), status = IFNULL(?, status) WHERE id_product = ?", [name, total_quantity, price, description, id_category, status, id])
        if (product.affectedRows == 0) return res.status(404).json({
            message : "No se ha actualizado nada"
        })
        const [products] = await pool.query("SELECT * FROM Products WHERE id_product = ?", [id])
        res.json(products)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al actualizar el producto"
        })
    }
}

export const patchProductStatus = async(req, res) => {
    const {id} = req.params
    try {
        const [products] = await pool.query("SELECT * FROM Products WHERE id_product = ?", [id])
        const newStatus = products[0].status == 1 ?  0 : 1;
        await pool.query("UPDATE Products SET status = ? WHERE id_product = ?", [newStatus, id])
        const [product] = await pool.query("SELECT * FROM Products WHERE id_product = ?", [id])
        res.json(product)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al cambiar el estado del producto"
        })
    }
}

export const getAllImages = async(req, res) => {
    try {
        const [images] = await pool.query('SELECT * FROM Images')
        res.json(images)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener imagenes"
        })
    }
}

export const getImage = async(req, res) => {
    const {id_image} = req.params
    try {
        const [images] = await pool.query('SELECT * FROM Images WHERE id_image = ?', [id_image])
        res.json(images)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener la imagen"
        })
    }
}

export const getImagesProduct = async(req, res) => {
    const {id_product} = req.params
    try {
        const [images] = await pool.query('SELECT * FROM Images WHERE id_product = ?', [id_product])
        res.json(images)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener las imagenes"
        })
    }
}

export const postImages = async(req, res) => {
    const {id_product, path_image} = req.body
    try {
        const [images] = await pool.query('INSERT INTO Images (id_product, path_image) VALUES (?, ?)', [id_product, path_image])
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al registrar la imagen"
        })
    }
}

export const deleteImages = async(req, res) => {
    const {id_image} = req.params
    try {
        const [image] = await pool.query("DELETE FROM Products WHERE id_image = ?", [id_image])
        if (image.affectedRows <= 0) return res.status(404).json({
            message: "No se ha eliminado ninguna imagen"
        })
        res.json({
            message : `Imagen # ${id_image} eliminada`
        })
        console.log(city)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al eliminar la imagen"
        })
    }
}