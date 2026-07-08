
const express = require("express");
const cors = require('cors')
const {dbConnection} = require("../database/config")
const helmet = require("helmet");

class Server {

  constructor() {
    //App de express
    this.app = express();
    //Variable de entorno
    this.port = process.env.PORT || 3000;
    //Rutas ubicacion
    this.paths = {
      prueba: "/api/prueba",
      entry: "/api/entry"
    } 
    //Coneccion a base de datos 
    this.connectDb()
    //Middlewares
    this.middlewares()
    //Rutas de aplicacion
    this.routes()
    
    
  }

  middlewares () { 
    //CORS
    this.app.use(cors())
    //Helmet
    this.app.use(helmet())
    //Lectura de parseo de Body
    this.app.use(express.json())
    // Directorio Publico
    this.app.use(express.static("public"))
}

  routes () {
    this.app.use(this.paths.prueba,require("../routes/prueba-route"))
    this.app.use(this.paths.entry,require("../routes/entry-route"))
  }

  async connectDb () {
    await dbConnection();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port} `);
    });
  }

  
}

module.exports = Server;