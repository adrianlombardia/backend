const Database = require('./config/database');
const CONFIG = require('./config/config');
const app = require('./app');

Database.connect();

app.listen(CONFIG.PORT, err => {
    if (err) return console.log(err)
    console.log(`Servidor corriendo en el puerto: ${CONFIG.PORT}`);
}) 
