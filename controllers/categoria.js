var Categoria = require('../models/categoria');
var jwt = require('../helpers/jwt');

// var smtpTransport = require('nodemailer-smtp-transport');
// var path = require('path');


const registro_categoria = async function(req,res){
    //
    if (req.user){
        if(req.user.rol == 'admin'){
          var data = req.body;
         var reg = await Categoria.create(data);
         res.status(200).send({data:reg});
        }else {
            res.status(500).send({message: 'NoAccess'})
        }
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
  

}

listar_categoria = async function(req,res){
    if (req.user){
        if(req.user.rol == 'admin'){
   
        var categoria = await Categoria.find();
        res.status(200).send({data:categoria});
    }else {
        res.status(500).send({message: 'NoAccess'})
    }
} else {
    res.status(500).send({message: 'NoAccess'})
}
   
}

const eliminar_categoria = async function(req, res){
  
    if (req.user){
        if(req.user.rol == 'admin'){
          var id = req.params.id;
          let reg = await Categoria.findByIdAndRemove({_id: id});
         res.status(200).send({data: reg});
        }else {
            res.status(500).send({message: 'NoAccess'})
        }
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
   
}




module.exports = {
    registro_categoria,
    listar_categoria,
    eliminar_categoria

}