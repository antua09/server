//const express = require("express");
const cors = require('cors');
const https = require('https');
const fs = require('fs');
//const mongoose = require('mongoose');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.mongoose = mongoose;

        this.middlewares();
        this.routers();
        this.listen();
        this.conectarMongoose();
    }

    conectarMongoose() {
        // Conexion a MongoDB
        this.mongoose.connect('mongodb://localhost:27017/DB_empleados', {});

        // Agregar schema
        let schemaEmpleado = new this.mongoose.Schema({
            nombre: String,
            departamento: String,
            numero: String,
            puesto: String,
        });

        let schemaEstadoCompactador = new this.mongoose.Schema({
            estado: Number,
        });

        this.empleados = this.mongoose.model('empleados', schemaEmpleado, 'empleados');
        this.estadoCompactador = this.mongoose.model('estadoCompactador', schemaEstadoCompactador, 'estadoCompactador');
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.static('public'));
    }

    routers() {
        this.app.get("/consultar", async (req, res) => {
            console.log("Ruta consultar...");
            const empleado = await this.empleados.find({});
            console.log(empleado);
            res.json(empleado);
        });

        this.app.get("/encenderCompactador", async (req, res) => {
            try {
                await this.estadoCompactador.updateOne({}, { $set: { estado: 1 } }, { upsert: true });
                console.log("Compactador encendido");
                res.status(200).send('Status: OK');
            } catch (error) {
                console.error('Error al actualizar el estado:', error);
                res.status(500).json({ error: 'Error al actualizar el estado' });
            }
        });

        this.app.get("/apagarCompactador", async (req, res) => {
            try {
                await this.estadoCompactador.updateOne({}, { $set: { estado: 0 } }, { upsert: true });
                console.log("Compactador apagado");
                res.status(200).send('Status: OK');
            } catch (error) {
                console.error('Error al actualizar el estado:', error);
                res.status(500).json({ error: 'Error al actualizar el estado' });
            }
        });

        this.app.get("/registrar", (req, res) => {
            let nombre = req.query.nombre;
            let numero = req.query.numero;
            let puesto = req.query.puesto;
            let departamento = req.query.dep;

            let empleado1 = new this.empleados({
                nombre: nombre,
                numero: numero,
                puesto: puesto,
                departamento: departamento
            });
            empleado1.save();
            res.send("ok");
        });

        // Agregar una ruta para consultar registros (tema libre)
        this.app.get("/ciudades", (req, res) => {
            console.log("Ruta ciudades...");
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
        https.createServer({
            key: fs.readFileSync('cert.key'),
            cert: fs.readFileSync('cert.crt'),
        }, 
        this.app).listen(this.port, () => {
            console.log("https://127.0.0.1:" + this.port);
        });
    }
}

module.exports = Server;
