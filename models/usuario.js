const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        require: [true, 'El nombre es obligatoria']
    },
    correo:{
        type: String,
        require: [true, 'El email es obligatoria'],
        unique:true
    },
    password:{
        type: String,
        require: [true, 'La constraseña es obligatoria']
    },
    img:{
        type: String,        
    },
    rol:{
        type: String,
        require: [true, 'El rol es obligatoria'],
        enum:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type: Boolean,
        default:true
    },
    google:{        
            type: Boolean,
            default:false
    }
})

UsuarioSchema.methods.toJSON = function(){
    const {__v,password,_id,...usuario} = this.toObject()
    usuario.uid = _id
    return usuario

}

module.exports = model( 'Usuario', UsuarioSchema)