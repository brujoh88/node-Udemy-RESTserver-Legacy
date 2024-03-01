const mongoose = require('mongoose')

const dbConnection = async ()=>{

    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Base de datos conectada');
    } catch (error) {
        throw new Error('Error al levantar la base de datos, \nError: '+ error)
    }
}

module.exports = {
    dbConnection
}