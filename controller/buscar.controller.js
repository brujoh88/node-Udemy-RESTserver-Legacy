const { response, request } = require("express")


const buscar = (req = request, res = response )=>{
    res.json({
        msg:'Buscar...'
    })
}

module.exports = {
    buscar
}