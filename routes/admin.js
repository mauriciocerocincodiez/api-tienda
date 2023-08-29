'use strict'
var express = require('express');
var adminContrller = require('../controllers/AdminController');

var api = express.Router();

api.post('/registro_admin', adminContrller.registro_admin);
api.post('/login_admin', adminContrller.login_admin);
module.exports = api;