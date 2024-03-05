
const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
class Server {
    constructor(){
    this.app = express()
    this.port = process.env.PORT    
    this.usuariosPath = '/api/usuarios'
    this.authPath = '/api/auth'

    //Conectar a base de datos
    this.conecctarDB()

    //Middlewares
    this.middlewares()

    this.routes()        
    }

    async conecctarDB(){
        await dbConnection()
    }

    middlewares(){
        //CORS
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use(express.json())

        //Directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.authPath,require('../routes/auth.routes'))
        this.app.use(this.usuariosPath,require('../routes/user.routes'))

    }

    listen(){
        this.app.listen(this.port,()=>{console.log(`Servidor corriendo en el puerto ${this.port}`);})
    }
}


module.exports = Server