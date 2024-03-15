
const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
const fileUpload = require('express-fileupload')
class Server {
    constructor(){
    this.app = express()
    this.port = process.env.PORT    
    this.path = {
        auth:'/api/auth',
        buscar: '/api/buscar',
        categorias:'/api/categorias',
        productos:'/api/productos',
        uploads:'/api/uploads',
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

        // Note that this option available for versions 1.0.0 and newer. 
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
            }));
    }

    routes(){
        this.app.use(this.path.auth,require('../routes/auth.routes'))
        this.app.use(this.path.buscar,require('../routes/buscar.routes'))
        this.app.use(this.path.categorias,require('../routes/cateorigas.routes'))
        this.app.use(this.path.productos,require('../routes/productos.routes'))
        this.app.use(this.path.uploads,require('../routes/upload.routes'))        
        this.app.use(this.path.usuarios,require('../routes/user.routes'))
    }

    listen(){
        this.app.listen(this.port,()=>{console.log(`Servidor corriendo en el puerto ${this.port}`);})
    }
}


module.exports = Server