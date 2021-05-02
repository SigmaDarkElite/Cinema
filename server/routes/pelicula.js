import express from 'express';
const router = express.Router();
const database = require('../connection');

// Regresa todas las salas de cine
router.get('/get-peliculas', async(req, res) => {
    try {
        const salas = await database.query('SELECT * FROM pelicula')
        res.json(salas)
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        })
    }
})

// Inserta una nueva pelicula en la base de datos
router.post('/agregar-pelicula', async(req, res) => {
    try{
        let { nombre, descr, imagen } = req.body;

        await database.query(`INSERT INTO pelicula (nombre, descr, imagen ) VALUES ('${nombre}', '${descr}', '${imagen}')`);

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