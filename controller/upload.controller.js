const { response, request } = require("express");
const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require("../models");


const cargarArchivo = async(req = request, res = response)=>{  

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({msg:'No hay archivo en la peticion'});
    return;
  }
  try {
    //const nombre = await subirArchivo  (req.files, ['txt','md'], 'textos')
    const nombre = await subirArchivo  (req.files, undefined, 'img')

    res.json({
        nombre
    })    
  } catch (error) {
    res.status(400).json({
        msg: error
    })
  }
  
}

const actualizarImagen  = async (req = request, res = response)=>{
  const {id,coleccion} = req.params
  let modelo
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id)
      if (!modelo) {
        return res.status(400).json({msg:`No existe el usuario con ID: ${id}`})
      }
      break;
    
      case 'productos':
        modelo = await Producto.findById(id)
        if (!modelo) {
          return res.status(400).json({msg:`No existe el producto con ID: ${id}`})
        }
        break;
  
    default:
      return res.status(500).json({msg:'Se me olvido validar esto'})
  }

  const nombre = await subirArchivo  (req.files, undefined, coleccion)
  modelo.img = nombre
  await modelo.save()
  res.json(modelo)
}

module.exports = {
    cargarArchivo,
    actualizarImagen
}