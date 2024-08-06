const express = require("express");
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000; // Usar el puerto proporcionado por Render o 3000 como respaldo

        this.middlewares();
        this.routers();
        this.listen();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.static('public'));
    }

    routers() {
        this.app.get("/", (req, res) => {
            res.send("Servidor funcionando correctamente");
        });

        this.app.get("/consultar", (req, res) => {
            res.json({ mensaje: "Consulta deshabilitada" });
        });

        this.app.get("/encenderCompactador", (req, res) => {
            console.log("Compactador encendido");
            res.status(200).send('Status: OK');
        });

        this.app.get("/apagarCompactador", (req, res) => {
            console.log("Compactador apagado");
            res.status(200).send('Status: OK');
        });

        this.app.get("/registrar", (req, res) => {
            res.send("Registro deshabilitado");
        });

        this.app.get("/ciudades", (req, res) => {
            let ciudades = [
                {
                    "Ciudad": "Madrid",
                    "Pais": "España",
                    "Poblacion": 3223000
                },
                {
                    "Ciudad": "Ciudad de México",
                    "Pais": "México",
                    "Poblacion": 9209944
                },
                {
                    "Ciudad": "Buenos Aires",
                    "Pais": "Argentina",
                    "Poblacion": 2890151
                }
            ];
            res.json(ciudades);
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en http://127.0.0.1:${this.port}`);
            console.log(`Aplicación corriendo en puerto ${this.port}`);
        });
    }
}

module.exports = Server;

// Iniciar el servidor
const server = new Server();
