const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



const db = mysql.createPool({
    host: "database-donaciones-calendario.clcawmawq8ni.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "jesusmiguel2024-2425",
    database: "DB_donacionesODS06",
    port: 3306
}).promise();

db.getConnection()
.then(() => {
    console.log("Conexion Exitosa");
})
.catch((err) =>{
    console.log("Error de conexion a la base de datos: ", err)
})


app.post("/submit-donation", async  (req, res) => {
    const { name, email, cellphone, amount, descripcion, card_type, card_number, cvc, expiration_date } = req.body;



    if (!name || !email || !cellphone || !amount || !descripcion || !card_type || !card_number || !cvc || !expiration_date) {
        return res.status(400).json({ success: false, message: "Todos los campos son obligatorios." });
    }

    try {
        // Insertar donante
        const [donorResult] = await db.query("INSERT INTO donor (name, email, cellphone) VALUES (?,?,?)", [name, email, cellphone]);
        const donorId = donorResult.insertId;

        // Insertar tarjeta
        await db.query("INSERT INTO card (card_type, card_number, cvc, expiration_date, donor_id) VALUES (?,?,?,?,?)", [card_type, card_number, cvc, expiration_date, donorId]);

        // Insertar donación
        await db.query("INSERT INTO donations (amount, donor_id, descripcion) VALUES (?,?,?)", [amount, donorId, descripcion]);

        console.log("Donación registrada correctamente.");
        return res.status(200).json({ success: true, message: "Donación registrada correctamente" });
    } catch (err) {
        console.error("Error al registrar la donación:", err.message);
        return res.status(500).json({ success: false, message: "Error al registrar la donación. Detalles: " + err.message });
    }
});




app.listen(PORT, () =>{
    console.log(`Server Prendido en http://localhost:${PORT}`);
})