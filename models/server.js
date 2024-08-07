const express = require("express");
const cors = require('cors');
const https = require('https');
const fs = require('fs');
// const mongoose = require('mongoose'); // Comentado

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        // this.mongoose = mongoose; // Comentado

        this.middlewares();
        this.routers();
        this.listen();
        // this.conectarMongoose(); // Comentado
    }

    // conectarMongoose() { // Comentado
        // Conexion a MongoDB
        // this.mongoose.connect('mongodb://localhost:27017/DB_empleados', {}); // Comentado

        // Agregar schema
        // let schemaEmpleado = new this.mongoose.Schema({ // Comentado
        //     nombre: String,
        //     departamento: String,
        //     numero: String,
        //     puesto: String,
        // });

        // let schemaEstadoCompactador = new this.mongoose.Schema({ // Comentado
        //     estado: Number,
        // });

        // this.empleados = this.mongoose.model('empleados', schemaEmpleado, 'empleados'); // Comentado
        // this.estadoCompactador = this.mongoose.model('estadoCompactador', schemaEstadoCompactador, 'estadoCompactador'); // Comentado
    // } // Comentado

    middlewares() {
        this.app.use(cors());
        this.app.use(express.static('public'));
    }

    routers() {
        this.app.get("/consultar", async (req, res) => {
            console.log("Ruta consultar...");
            // const empleado = await this.empleados.find({}); // Comentado
            // console.log(empleado); // Comentado
            // res.json(empleado); // Comentado
            res.json({ mensaje: "Consulta deshabilitada" }); // Línea añadida para no romper la ruta
        });

        this.app.get("/encenderCompactador", async (req, res) => {
            try {
                // await this.estadoCompactador.updateOne({}, { $set: { estado: 1 } }, { upsert: true }); // Comentado
                console.log("Compactador encendido");
                res.status(200).send('Status: OK');
            } catch (error) {
                console.error('Error al actualizar el estado:', error);
                res.status(500).json({ error: 'Error al actualizar el estado' });
            }
        });

        this.app.get("/apagarCompactador", async (req, res) => {
            try {
                // await this.estadoCompactador.updateOne({}, { $set: { estado: 0 } }, { upsert: true }); // Comentado
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

            // let empleado1 = new this.empleados({ // Comentado
            //     nombre: nombre,
            //     numero: numero,
            //     puesto: puesto,
            //     departamento: departamento
            // });
            // empleado1.save(); // Comentado
            res.send("Registro deshabilitado"); // Línea añadida para no romper la ruta
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
        this.app.listen(this.port, '0.0.0.0', () => {
            console.log(`Aplicación corriendo en http://0.0.0.0:${this.port}`);
            console.log(`Aplicación corriendo en puerto ${this.port}`);
        });
    }
}
module.exports = Server;
