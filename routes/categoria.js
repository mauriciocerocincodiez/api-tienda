'use strict'

var express = require('express');
var CategoriaController = require('../controllers/categoria');

var api = express.Router();
var auth = require('../middlewares/authenticate');

api.post('/registro_categoria',auth.auth,CategoriaController.registro_categoria);
api.get('/listar_categoria',auth.auth,CategoriaController.listar_categoria);
api.delete('/eliminar_categoria/:id',auth.auth,CategoriaController.eliminar_categoria);

module.exports = api;