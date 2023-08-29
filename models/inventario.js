'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InventarioSchema = Schema({
    
    producto: {type: Schema.ObjectId, ref: 'producto', require: true},
    cantidad: {type: Number, require: true},
    proveedor: {type: String, require: true},
    admin: {type: Schema.ObjectId, ref: 'admin', require: true},
    creatAt: {type: Date, default: Date.now(),require: true}

});

module.exports = mongoose.model('inventario',InventarioSchema);