const express = require('express');
const path = require('path')
const app = express();


app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get("/exploraODS06", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'exploraODS06.html' ))
})

const PORT = 4000;
app.listen(PORT, () => {
    console.log("Server prendido")
})