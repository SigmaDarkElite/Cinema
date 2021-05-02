import express from 'express';
const router = express.Router();
const database = require('../connection');

// Regresa todas las salas de cine
router.get('/get-salas', async(req, res) => {
    try {
        const salas = await database.query('SELECT * FROM sala')
        res.json(salas)
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        })
    }
})

router.post('/get-sala', async(req, res) => {
    try {
        let { sala_id } = req.body
        const salas = await database.query(`SELECT * FROM sala WHERE id = ${sala_id}`)
        res.json(salas)
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        })
    }
})

// Inserta una sala en la base de datos
router.post('/agregar-sala', async(req, res) => {
    try{
        let { n_filas, n_asientos } = req.body;

        await database.query(`INSERT INTO sala (n_filas, n_asientos ) VALUES (${n_filas}, ${n_asientos})`);

        res.json({
            mensaje: 'PRODUCT_ADDED'
        });
    }
    catch (error){
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        });
    }
})

module.exports = router;