import mysql from 'mysql';
import { promisify } from 'util';

// Credenciales de la base de datos
const database = {
    host: 'localhost',
    user: 'root',
    password: 'elitezer665TT',
    database: 'cinema'
}

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Base de datos: Conexión Perdida');
        }
        if ( err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Base de datos: Demasiadas conexiones');
        }
        if ( err.code === 'ECONNREFUSED'){
            console.error('Base de datos: Conexion denegada');
        }
    }

    if (connection) connection.release();
    console.log('Base de datos: conectada');

    return;
});

// Usar promesas con querys
pool.query = promisify(pool.query);

module.exports = pool;