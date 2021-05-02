// Framework para hacer APIs
const express = require('express');
const app = express();
// Librería para acceder al path del sistema
const path = require('path');

// Para ver las peticiones HTTP en la consola
const morgan = require('morgan');
app.use(morgan('tiny'));
// Impedir el bloqueo por cors del sitio
const cors = require('cors');
app.use(cors());

// Usar json y urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// // Rutas de peticiones
app.use('/api/compra', require('./routes/compra'));
app.use('/api/funcion', require('./routes/funcion'));
app.use('/api/pelicula', require('./routes/pelicula'));
app.use('/api/sala', require('./routes/sala'));

// Conectar Vue con node sin fallos
const history = require('connect-history-api-fallback');
app.use(history());
// Definir el directorio public como entrada para la página
app.use(express.static(path.join(__dirname, 'public')));

// Puerto de la computadora donde corre la aplicación
app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), function () {
  console.log('App corriendo en puerto ' + app.get('puerto'));
});
