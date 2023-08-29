var Artesano = require('../models/Artesano');
var jwt = require('../helpers/jwt');
var bcrypt = require('bcrypt-nodejs');


// var smtpTransport = require('nodemailer-smtp-transport');
// var path = require('path');


const registro_artesano = async function(req,res){
    //
    if (req.user){
        if(req.user.rol == 'admin'){
    var data = req.body;
         var reg = await Artesano.create(data);
         res.status(200).send({data:reg});
  
        }else {
            res.status(500).send({message: 'NoAccess'})
        }
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
}

listar_artesanos_tienda = async function(req,res){
    if (req.user){
        if(req.user.rol == 'admin'){
        var artesano = await Artesano.find();
        res.status(200).send({data:artesano});
    }else {
        res.status(500).send({message: 'NoAccess'})
    }
} else {
    res.status(500).send({message: 'NoAccess'})
}
   
}

const eliminar_artesano_admin = async function(req, res){
  
    if (req.user){
        if(req.user.rol == 'admin'){
        
          var id = req.params.id;
          let reg = await Artesano.findByIdAndRemove({_id: id});
         res.status(200).send({data: reg});
        }else {
            res.status(500).send({message: 'NoAccess'})
        }
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
   
}


const obtener_artesano_admin = async function(req,res){
    if (req.user){
        if(req.user.rol == 'admin'){
        var id = req.params['id'];

        try {
            var reg = await Artesano.findById({_id:id});
            res.status(200).send({data:reg});
        } catch (error) {
            res.status(200).send({data:undefined});
        }
    }else {
        res.status(500).send({message: 'NoAccess'})
    }
} else {
    res.status(500).send({message: 'NoAccess'})
}
}


const actualizar_artesano_admin = async function(req, res){
    if (req.user){
        if(req.user){
         var id = req.params['id'];
         var data = req.body;
         var reg = await Artesano.findByIdAndUpdate({_id: id}, {
            nombres: data.nombres,
            apellidos: data.apellidos,
            telefono: data.telefono,
            cedula: data.cedula,
            f_nacimiento: data.f_nacimiento,
         });
          
         
         res.status(200).send({data: reg})
            
          

        }else {
            res.status(500).send({message: 'NoAccess'})
        }
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
}


module.exports = {
    registro_artesano,
    listar_artesanos_tienda,
    eliminar_artesano_admin,
    obtener_artesano_admin,
    actualizar_artesano_admin
}