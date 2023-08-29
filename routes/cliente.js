'use strict'
var express = require('express');
var clienteContrller = require('../controllers/ClienteController');

var api = express.Router();
var auth = require('../middlewares/authenticate');

api.post('/login_cliente', clienteContrller.login_cliente);
api.post('/registro_cliente', clienteContrller.registro_cliente);
api.get('/listar_clientes_filtro_admin/:tipo/:filtro',auth.auth, clienteContrller.listar_clientes_filtro_admin);
api.post('/registro_cliente_admin',auth.auth, clienteContrller.registro_cliente_admin);
api.get('/obtener_cliente_admin/:id',auth.auth, clienteContrller.obtener_cliente_admin);
api.put('/actualizar_cliente_admin/:id', auth.auth, clienteContrller.actualizar_cliente_admin);
api.delete('/eliminar_cliente_admin/:id', auth.auth, clienteContrller.eliminar_cliente_admin);
api.get('/obtener_cliente_gets/:id',auth.auth, clienteContrller.obtener_cliente_gets);
api.put('/actulizar_cliente_gets/:id', auth.auth, clienteContrller.actulizar_cliente_gets);

// DIRECCIONES.....
api.post('agregar_direccion_cliente1', auth.auth, clienteContrller.agregar_direccion_cliente1);
module.exports = api;
