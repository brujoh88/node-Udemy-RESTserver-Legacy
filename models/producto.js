const {Schema, model} = require('mongoose')

const ProductoShema = Schema({
    nombre:{
        type: String,
        required: [true, "El nombre del producto es obligatorio"],
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
    },
    precio:{
        type: Number,
        default:0
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref:'Categoria',
        required: true
    },
    descripcion:{
        type: String
    },
    disponible:{
        type: Boolean,
        default:true
    },
    img:{
        type: String,        
    },
})

ProductoShema.methods.toJSON = function(){
    const {__v,estado,...data} = this.toObject()    
    return data

}

module.exports = model('Producto',ProductoShema)