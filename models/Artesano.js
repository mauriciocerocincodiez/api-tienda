'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtesanoSchema = Schema({
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    pais: {type: String, required: false, default: 'Colombia'},
    email: {type: String, required: false},
    password: {type: String, required: false},
    telefono: {type: String, required: true},
    genero: {type: String, required: false},
    cuenta_ahorros: {type: String, required: false},
    f_nacimiento: {type: String, required: false},
    cedula: {type: String, required: true},
    createdAt: {type:Date, default: Date.now, require: true}
});

module.exports =  mongoose.model('artesano',ArtesanoSchema);