'use strict'

var Cliente = require('../models/cliente');
var Carrito = require('../models/carrito');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');
var ObjectId = require('mongodb').ObjectId;

// epayco
var epayco = require('epayco-sdk-node')({
    apiKey: '34f054ca93562e3b9baafd02daab181c',
    privateKey: '29a67f77014dc6b0cca312140ee6736a',
    lang: 'ES',
    test: true
})

const agregar_carrito_cliente = async function(req, res){
  
    if (req.user){
      let data = req.body;
      let carrito_cliente = await Carrito.find({clente: data.cliente, producto: data.producto});
       if(carrito_cliente.length == 0){
        let reg = await Carrito.create(data);
        res.status(200).send({data: reg});
       } else if(carrito_cliente.length != 0){
        res.status(200).send({data: 1});
       }
    
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
}

const obtener_carrito_cliente = async function(req, res){
  
    if (req.user){

       let carrito_cliente = await Carrito.find({cliente: ObjectId(req.params.id)}).populate('producto');
      
      
      res.status(200).send({data: carrito_cliente})
    
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
}

const eliminar_carrito_cliente = async function(req, res){
  
    if (req.user){

       let reg = await Carrito.findByIdAndRemove({_id: req.params.id});
       
       res.status(200).send({data: reg})
    
    } else {
        res.status(500).send({message: 'NoAccess'})
    }
}

const epayco_consulta = async function(req, res){
    var payment_info = {
     
        doc_type: "CC",
        doc_number: "10358519",
        name: "John",
        last_name: "Doe",
        email: "example@email.com",
        city: "Bogota",
        address: "Cr 4 # 55 36",
        phone: "3005234321",
        cell_phone: "3010000001",
        bill: "OR-1234",
        description: "Test Payment",
        value: "116000",
        tax: "0",
        tax_base: "",
        currency: "COP",

        url_response: "https://ejemplo.com/respuesta.html",
        url_confirmation: "https://ejemplo.com/confirmacion",
        method_confirmation: "GET",
    
     
   
    }
    epayco.charge.create(payment_info)
        .then(function(charge) {
            console.log(charge);
        })
        .catch(function(err) {
            console.log("err: " + err);
        });
}


module.exports = {
    agregar_carrito_cliente,
    obtener_carrito_cliente,
    eliminar_carrito_cliente,
    epayco_consulta

}