const { response, request } = require("express");
const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require("../models");
const path = require('path')
const fs = require('fs')
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);
const cargarArchivo = async(req = request, res = response)=>{    
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

  try {
    if (modelo.img) {
      const pathImagen = path.join(__dirname,'../uploads', coleccion, modelo.img)
      if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen)        
      }
    }
  } catch (error) {
    
  }

  const nombre = await subirArchivo  (req.files, undefined, coleccion)
  modelo.img = nombre
  await modelo.save()
  res.json(modelo)
}


const mostrarImagen = async (req= request, res= response)=>{
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

  try {
    if (modelo.img) {
      const pathImagen = path.join(__dirname,'../uploads', coleccion, modelo.img)
      if (fs.existsSync(pathImagen)) {
        return res.sendFile(pathImagen)
      }
    }
  } catch (error) {
    console.log(error);
  }
  res.json({msg:'falta placeholder'})
}

const actualizarImagenCloudinary  = async (req = request, res = response)=>{  
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

  try {
    if (modelo.img) {
      
    }
  } catch (error) {
    
  }

  const { tempFilePath } = req.files.archivo
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
  modelo.img = secure_url
  await modelo.save()
  
  res.json(modelo)
}

module.exports = {
    actualizarImagen,
    actualizarImagenCloudinary,
    cargarArchivo,
    mostrarImagen
}