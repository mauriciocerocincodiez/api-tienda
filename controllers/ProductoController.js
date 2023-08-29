'use strict'

var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');
const Producto = require('../models/producto');
const Artesano = require('../models/Artesano');
const Inventario = require('../models/inventario');
var ObjectId = require('mongodb').ObjectId;
var uniqid = require('uniqid'); 
var fs = require('fs');
var path = require('path');


const registro_producto_admin = async function (req, res){
    if(req.user){
     if(req.user.rol == 'admin')
     {
        let data = req.body;
        var img_path = req.files.portada.path;
        var nombre_portada = img_path.split('/')[2];
        data.portada = nombre_portada;
        data.id_artesano = ObjectId(req.body.id_artesano);
        data.id_categoria = ObjectId(req.body.id_categoria);
       
       // data.slug = data.titulo.toLowercase().replace(/ /g,'-').replace(/[^\w-]+/g,''); 
        let reg = await Producto.create(data);
        let inventario = await Inventario.create({
            admin: req.user.sub,
            cantidad: data.stock,
            proveedor: 'Primer registro',
            producto: reg._id
        });
       
        res.status(200).send({data: reg, inventario: inventario});  


     }else {
        res.status(500).send({message: 'NoAccess'});
     }

    } else {
        res.status(500).send({message: 'NoAccess'});
    }
}


const listar_producto_admin = async function (req, res){
    if(req.user){
     if(req.user.rol == 'admin')
     {
       var filtro = req.params.filtro;
   
       if (req.params.filtro == 'null' || req.params.filtro == null || req.params.filtro == '' ){
        var filtro = req.params.filtro;
        let reg = await Producto.find();
        res.status(200).send({data: reg});
       } else {
        
        let reg = await Producto.find({titulo: new RegExp(filtro, 'i')});
        res.status(200).send({data: reg});
       }
        

     }else {
        res.status(500).send({message: 'NoAccess'});
     }

    } else {
        res.status(500).send({message: 'NoAccess'});
    }
 }

 const obtener_producto_admin = async function(req, res){
    if (req.user){
        if(req.user.rol == 'admin'){
        
            var id = req.params['id'];
            
            try {

                var reg = await Producto.findById({_id: id});
                res.status(200).send({data: reg});
                
            } catch (error) {
                res.status(200).send({data: undefined});
            }

        }else {
            res.status(500).send({message: 'NoAccess'})
        }
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
}

const actualizar_producto_admin = async function(req, res){
    if (req.user){
        if(req.user.rol == 'admin'){
         var id = req.params['id'];
         var data = req.body;
         var img_path = req.files.portada.path;
         var nombre_portada = img_path.split('/')[2];
          data.portada = nombre_portada;
         var reg = await Producto.findByIdAndUpdate({_id: id}, {
            titulo: data.titulo,
            stock: data.cantidad,
            precio: data.precio,
            categoria: data.categoria,
            descripcion: data.descripcion,
            portadad: data.portada
         });
          
      
         res.status(200).send({data: reg})
            
          

        }else {
            res.status(500).send({message: 'NoAccess'})
        }
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
}

const obtener_inventario_admin = async function(req, res){
    
    if (req.user){
        if(req.user.rol == 'admin'){
        

           const aggregateOptions = [
            { 
                $match: { _id: ObjectId(req.params.id) }
            },
            {
               $lookup: {
                from: 'inventarios',
                localField: '_id',
                foreignField: 'producto',
                as: 'inventario'
               }
            },
            {
                $unwind: '$inventario'
            },
            {
                $project: {
                  _id: '$_id', titulo:'$titulo', titulo_variedad: '$titulo_variedad', variedades: '$variedades', galeria: '$galeria', cantidad: '$inventario.cantidad', proveedor: '$inventario.proveedor'
                }
            }
            
           ]

           const reg = await Producto.aggregate(aggregateOptions);
           
            res.status(200).send({data: reg});
           

        }else {
            res.status(500).send({message: 'NoAccess'})
        }
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
}

const actualizar_producto_variedades_admin = async function(req, res){
    if (req.user){
        if(req.user.rol == 'admin'){
         let id = req.params['id'];
         let data = req.body;
       
         let reg = await Producto.findByIdAndUpdate({_id: id}, {
            variedades: data.variedades,
            titulo_variedad: data.titulo_variedad
         });
         res.status(200).send({data: reg})
            
          

        }else {
            res.status(500).send({message: 'NoAccess'})
        }
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
}

const agregar_imagen_galeria_admin = async function(req, res){
    if (req.user){
        if(req.user.rol == 'admin'){
         let id = req.params['id'];
         let data = req.body;
         var img_path = req.files.imagen.path;
         var nombre_imagen = img_path.split('\\')[2];
         
     
         
      
         let reg = await Producto.findByIdAndUpdate({_id: id}, {$push: {galeria:  {
            imagen: nombre_imagen,
            _id: uniqid()
         }}});
            
          res.status(200).send({message: reg});

        }else {
            res.status(500).send({message: 'NoAccess'})
        }
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
}

const obtener_portada = async function(req, res){
  var img = req.params['img'];

  fs.stat('./uploads/productos/'+img, function(err){
  if(!err){
    let path_img = './uploads/productos/'+img;
    res.status(200).sendFile(path.resolve(path_img));
  }
  })
}

const eliminar_imagen_galeria_admin = async function(req, res){
    if (req.user){
        if(req.user.rol == 'admin'){
         let id = req.params['id'];
         let data = req.body;
         
         let reg = await Producto.findByIdAndUpdate({_id: id}, {$pull: {galeria: {_id: data._id}}} );
            
          res.status(200).send({message: reg});

        }else {
            res.status(500).send({message: 'NoAccess'})
        }
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
}


const obtener_productos = async function(req, res) {
    try {
        var reg = await Producto.find().sort({ creatAt: -1 }).populate({
            path: 'id_artesano',
            select: 'telefono' // Aquí especificamos el campo 'telefono'
        });
        res.status(200).send({ data: reg });
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener los productos' });
    }
}



const obtener_producto_cliente = async function(req, res){
  
        
            
            if (req.user){
                var id = req.params['id'];
            
                try {
    
                    var reg = await Producto.findById({_id: id});
                    res.status(200).send({data: reg});
                    
                } catch (error) {
                    res.status(200).send({data: undefined});
                }
            } else {
                res.status(500).send({message: 'NoAccess'})
            }
    
}

const obtener_producto = async function(req, res){
    var id = req.params['id'];
    
        try {

            var reg = await Producto.findById({_id: id}).sort({ creatAt: -1 }).populate({
                path: 'id_artesano',
                select: 'telefono' // Aquí especificamos el campo 'telefono'
            });
            res.status(200).send({data: reg});
            
        } catch (error) {
            res.status(200).send({data: undefined});
        }
  

}



module.exports = {
    registro_producto_admin,
    listar_producto_admin,
    obtener_producto_admin,
    actualizar_producto_admin,
    obtener_inventario_admin,
    actualizar_producto_variedades_admin,
    agregar_imagen_galeria_admin,
    obtener_portada,
    eliminar_imagen_galeria_admin,
    obtener_productos,
    obtener_producto_cliente,
    obtener_producto
};