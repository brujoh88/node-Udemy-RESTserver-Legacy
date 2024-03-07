
const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
class Server {
    constructor(){
    this.app = express()
    this.port = process.env.PORT    
    this.path = {
        auth:'/api/auth',
        categorias:'/api/categorias',
        usuarios:'/api/usuarios',
    }    

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
        this.app.use(this.path.auth,require('../routes/auth.routes'))
        this.app.use(this.path.usuarios,require('../routes/user.routes'))
        this.app.use(this.path.categorias,require('../routes/cateorigas.routes'))
    }

    listen(){
        this.app.listen(this.port,()=>{console.log(`Servidor corriendo en el puerto ${this.port}`);})
    }
}


module.exports = Server