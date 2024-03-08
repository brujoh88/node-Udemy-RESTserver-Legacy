const {Schema, model} = require('mongoose')

const CaterogiaShema = Schema({
    nombre:{
        type: String,
        required: [true, "El nombre de la categ. es obligatorio"],
        uniqued:true
    },
    estado:{
        type: Boolean,
        default: true,
        requided: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    }
})

CaterogiaShema.methods.toJSON = function(){
    const {__v,estado,...data} = this.toObject()    
    return data

}

module.exports = model('Categoria',CaterogiaShema)