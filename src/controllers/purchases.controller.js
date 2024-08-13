import {pool} from '../db.js'

export const getAllPurchases = async(req, res) => {
    try {
        const [purchases] = await pool.query('SELECT * FROM Purchases')
        res.json(purchases)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener las compras"
        })
    }
};

export const getPurchase = async(req, res) => {
    const {id_purchase} = req.params
    try {
        const [purchases] = await pool.query("SELECT * FROM Purchases WHERE id_purchase = ?", [id_purchase])
        if (purchases.length <= 0) return res.status(404).json({
            message : "No se ha encontrado ninguna compra"
        })
        res.json(purchases)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener la compra"
        })
    }
};

export const getPurchasesBuyer = async(req, res) => {
    const {id_buyer} = req.params
    try {
        const [purchases] = await pool.query('SELECT * FROM Purchases WHERE id_buyer = ?', [id_buyer])
        res.json(purchases)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener las compras del Comprador"
        })
    }
};

export const postPurchases = async(req, res) => {
    const {purchase_date, id_buyer} = req.body
    try {
        const [purchases] = await pool.query('INSERT INTO Purchases (purchase_date, id_buyer) VALUES (?, ?)', [purchase_date, id_buyer])
        res.send({
            id: purchases.insertId,
            purchase_date,
            id_buyer
        })
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al registrar la compra"
        })
    }
};

export const deletePurchases = async(req, res) => {
    const {id_purchase} = req.params
    try {
        const [purchase] = await pool.query('DELETE FROM Purchases WHERE id_purchase = ?', [id_purchase])
        if (purchase.affectedRows <= 0) return res.status(404).json({
            message: "No se ha eliminado ninguna compra"
        })
        res.json({
            message : `Compra # ${id_purchase} eliminada`
        })
        console.log(id_purchase)
    } catch (error) {

    }
};

export const getPurchaseDetails = async(req, res) => {
    const {id_purchase} = req.params
    try {
        const [purchasedetails] = await pool.query('SELECT * FROM PurchaseDetails WHERE id_purchase = ?', [id_purchase])
        res.json(purchasedetails)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al obtener los detalles de la compra"
        })
    }
};

export const postPurchaseDetails = async(req, res) => {
    const {id_purchase, id_product, quantity, unit_cost} = req.body
    try {
        const [purchaseDetails] = await pool.query('INSERT INTO PurchaseDetails (id_purchase, id_product, quantity, unit_cost) VALUES (?, ?, ?, ?)', [id_purchase, id_product, quantity, unit_cost])
        res.send({
            id: purchaseDetails.insertId,
            id_purchase,
            id_product,
            quantity,
            unit_cost
        })
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al registrar los detalles de la compra"
        })
    }
    
};

export const putPurchaseDetails = async(req, res) => {
    const {id_purchase, id_product} = req.body
    try {
        const [purchase] = await pool.query("UPDATE PurchaseDetails SET quantity = IFNULL(?, quantity), unit_cost = IFNULL(?, unit_cost) WHERE id_purchase IN (?) AND id_product = ?", [id_purchase, id_product])
        if (purchase.affectedRows <= 0) return res.status(404).json({
            message: "No se ha eliminado ninguna compra"
        })
        res.json(purchase)
    } catch (error) {
        return res.status(500).json({
            message : "Algo ha ido mal al eliminar la compra"
        })
    }
};