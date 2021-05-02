import express from 'express';
const router = express.Router();
const database = require('../connection');

// Regresa todas las salas de cine
router.get('/get-compras', async(req, res) => {
    try {
        const salas = await database.query('SELECT * FROM compras')
        res.json(salas)
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        })
    }
})

router.post('/agregar-compra', async(req, res) => {
    try{
        let { id_asiento, id_funcion, fecha_hora, total } = req.body;

        await database.query(`INSERT INTO compra (id_asiento, id_funcion, fecha_hora, total ) 
        VALUES ('${id_asiento}', ${id_funcion}, '${fecha_hora}', ${total})`);

        await database.query(`
        UPDATE asiento
        SET estado = 1
        WHERE id = '${id_asiento}';
        `)

        res.json({
            mensaje: 'PRODUCT_ADDED'
        });
    }
    catch (error){
        console.log(error)
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        });
    }
})

module.exports = router;