'use strict'
var express = require('express');
var productoController = require('../controllers/ProductoController');

var api = express.Router();
var auth = require('../middlewares/authenticate');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir: './uploads/productos'});

// PRODUCTOS
api.post('/registro_producto_admin',[auth.auth,path], productoController.registro_producto_admin);
api.get('/listar_producto_admin/:filtro', auth.auth, productoController.listar_producto_admin);
api.post('/actualizar_producto_admin/:id',[auth.auth,path], productoController.actualizar_producto_admin);
api.put('/actualizar_producto_variedades_admin/:id', auth.auth, productoController.actualizar_producto_variedades_admin);
api.put('/agregar_imagen_galeria_admin/:id', [auth.auth,path], productoController.agregar_imagen_galeria_admin);
api.get('/obtener_portada/:img', productoController.obtener_portada);
api.put('/eliminar_imagen_galeria_admin/:id', auth.auth, productoController.eliminar_imagen_galeria_admin);
api.get('/obtener_inventario_admin/:id', auth.auth, productoController.obtener_inventario_admin);
// CIENTE
api.get('/listar_producto_admin/:filtro', auth.auth, productoController.listar_producto_admin);
api.get('/obtener_productos',productoController.obtener_productos);
api.get('/obtener_producto_cliente/:id', auth.auth ,productoController.obtener_producto_cliente);
api.get('/obtener_producto/:id',productoController.obtener_producto);


module.exports = api;
