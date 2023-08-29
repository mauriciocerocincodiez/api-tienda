'use strict'

var express = require('express');
var ArtesanoController = require('../controllers/ArtesanoController');

var api = express.Router();
var auth = require('../middlewares/authenticate');

api.post('/registro_artesano',auth.auth,ArtesanoController.registro_artesano);
api.get('/listar_artesanos_tienda',auth.auth,ArtesanoController.listar_artesanos_tienda);
api.delete('/eliminar_artesano_admin/:id',auth.auth,ArtesanoController.eliminar_artesano_admin);
api.get('/obtener_artesano_admin/:id',auth.auth,ArtesanoController.obtener_artesano_admin);
api.put('/actualizar_artesano_admin/:id',auth.auth,ArtesanoController.actualizar_artesano_admin);
module.exports = api;