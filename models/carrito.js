'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarritoSchema = Schema({
    
    producto: {type: Schema.ObjectId, ref: 'producto', require: true},
    cliente: {type: Schema.ObjectId, ref: 'cliente', require: true},
    cantidad: {type: Number, require: true},
    precio: {type: Number, require: true},
    creatAt: {type: Date, default: Date.now(),require: true}

});

module.exports = mongoose.model('carrito',CarritoSchema);