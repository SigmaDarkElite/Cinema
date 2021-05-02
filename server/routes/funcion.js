import express from 'express';
const router = express.Router();
const database = require('../connection');

// Regresa todas las salas de cine
router.get('/get-funciones', async(req, res) => {
    try {
        const query = `
            SELECT f.id as id, f.id_sala as id_sala, f.fecha_hora as fecha_hora, f.precio as precio, p.nombre nombre, p.descr as descr, p.imagen as imagen
            FROM pelicula p, funcion f
            WHERE f.id_pelicula = p.id
        `
        const funciones = await database.query(query)
        res.json(funciones)
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        })
    }
})

// Regresa una función en específico
router.post('/get-funcion', async(req, res) => {
    try {
        let { funcion_id } = req.body;
        const query = `
            SELECT f.id as id, f.id_sala as id_sala, f.fecha_hora as fecha_hora, f.precio as precio, p.nombre nombre, p.descr as descr, p.imagen as imagen
            FROM pelicula p, funcion f
            WHERE f.id_pelicula = p.id AND f.id = ${funcion_id}
        `
        const funciones = await database.query(query)
        res.json(funciones)
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        })

    }
})

router.post('/get-asientos', async(req, res) => {
    try {
        let { funcion_id } = req.body;
        const query = `
            SELECT a.id, a.estado
            FROM asiento a, funcion f
            WHERE a.id_funcion = f.id AND f.id = ${funcion_id}
        `
        const asientos = await database.query(query)
        res.json(asientos)
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        })

    }
})



// Agrega una función nueva a la base de datos
router.post('/agregar-funcion', async(req, res) => {
    try{
        let { id_pelicula, id_sala, fecha_hora, precio } = req.body;

        const funcion = await database.query(`INSERT INTO funcion (id_pelicula, id_sala, fecha_hora, precio ) VALUES (${id_pelicula}, ${id_sala}, '${fecha_hora}', ${precio})`);

        const funcion_id = funcion.insertId
        const sala = await database.query(`SELECT * from sala WHERE id = ${id_sala}`)

        // Crea los asientos para nas n_filas * n_asientos de la sala donde se proyectará la función
        for(let i = 0; i < sala[0].n_filas; i++){
            for(let j = 0; j < sala[0].n_asientos; j++){
                if(i < 9){
                    if(j < 9){
                        // Inserta valores fila-asiento -> ejemplo: 1-01, 1-02, etc
                        await database.query(`INSERT INTO asiento VALUES ('0${i+1}-0${j+1}', ${funcion_id}, ${0})`)
                    } else {
                        // Inserta valores fila-asiento -> ejemplo: 1-10, 1-11, etc
                        await database.query(`INSERT INTO asiento VALUES ('0${i+1}-${j+1}', ${funcion_id}, ${0})`)
                    }
                } else{
                    if(j < 9){
                        // Inserta valores fila-asiento -> ejemplo: 1-01, 1-02, etc
                        await database.query(`INSERT INTO asiento VALUES ('${i+1}-0${j+1}', ${funcion_id}, ${0})`)
                    } else {
                        // Inserta valores fila-asiento -> ejemplo: 1-10, 1-11, etc
                        await database.query(`INSERT INTO asiento VALUES ('${i+1}-${j+1}', ${funcion_id}, ${0})`)
                    }
                }
            }
        }

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