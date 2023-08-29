'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
    titulo: {type: String, required: true},
    slug: {type: String, require: false},
    galeria: [{type: Object, required: false}],
    portada: {type: String, required: true},
    precio: {type: Number, require: true},
    descripcion: {type: String, required: true},
    contenido: {type: String, require: false},
    stock: {type: Number, required: false},
    nventas: {type: Number, required: true, default: 0 },
    npuntos: {type: Number, required: true, default: 0 },
    variedades: [{type: Object, required: false}],
    categoria: {type: String, required: true,},
    titulo_variedad: {type: Object, required: false},
    estado: {type: String, default: 'Edicion', require: true},
    id_artesano: {type: Schema.ObjectId, ref: 'artesano', required: true},
    id_categoria: {type: Schema.ObjectId, ref: 'categoria', required: true},
    creatAt: {type: Date, default: Date.now(),require: true}

});

module.exports = mongoose.model('producto',ProductoSchema);