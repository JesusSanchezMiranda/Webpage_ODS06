const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de conexiones a bases de datos
const dbCalendario = mysql.createConnection({
    host: 'database-donaciones-calendario.clcawmawq8ni.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'jesusmiguel2024-2425',
    database: 'calendario',
});

const dbDonaciones = mysql.createPool({
    host: 'database-donaciones-calendario.clcawmawq8ni.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'jesusmiguel2024-2425',
    database: 'DB_donacionesODS06',
    port: 3306,
}).promise();

// Verificar conexiones a las bases de datos
dbCalendario.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos de calendario:', err);
    } else {
        console.log('Conectado a la base de datos de calendario');
    }
});

dbDonaciones.getConnection()
    .then(() => console.log('Conectado a la base de datos de donaciones'))
    .catch(err => console.error('Error al conectar a la base de datos de donaciones:', err));

// Endpoints para la base de datos de calendario
app.get('/evento', (req, res) => {
    const { fecha } = req.query;
    const query = 'SELECT evento FROM fechas_civicas WHERE fecha = ?';
    dbCalendario.query(query, [fecha], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener el evento' });
        if (results.length > 0) {
            res.json({ evento: results[0].evento });
        } else {
            res.json({ evento: 'No hay eventos para esta fecha.' });
        }
    });
});

app.get('/fechas_civicas', (req, res) => {
    const { fecha } = req.query;
    const query = 'SELECT * FROM fechas_civicas WHERE fecha = ?';
    dbCalendario.query(query, [fecha], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener el evento' });
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.json({ evento: 'No hay eventos para esta fecha.' });
        }
    });
});

// Endpoints para la base de datos de donaciones
app.post('/submit-donation', async (req, res) => {
    const { name, email, cellphone, amount, descripcion, card_type, card_number, cvc, expiration_date } = req.body;

    if (!name || !email || !cellphone || !amount || !descripcion || !card_type || !card_number || !cvc || !expiration_date) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios.' });
    }

    try {
        const [donorResult] = await dbDonaciones.query(
            'INSERT INTO donor (name, email, cellphone) VALUES (?,?,?)',
            [name, email, cellphone]
        );
        const donorId = donorResult.insertId;

        await dbDonaciones.query(
            'INSERT INTO card (card_type, card_number, cvc, expiration_date, donor_id) VALUES (?,?,?,?,?)',
            [card_type, card_number, cvc, expiration_date, donorId]
        );

        await dbDonaciones.query(
            'INSERT INTO donations (amount, donor_id, descripcion) VALUES (?,?,?)',
            [amount, donorId, descripcion]
        );

        console.log('Donación registrada correctamente.');
        res.status(200).json({ success: true, message: 'Donación registrada correctamente' });
    } catch (err) {
        console.error('Error al registrar la donación:', err.message);
        res.status(500).json({ success: false, message: 'Error al registrar la donación. Detalles: ' + err.message });
    }
});

// Ruta base
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`); // cambiar el locallhost por tu ip
});
