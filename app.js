'use strict'

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
require('dotenv').config({path: '.env'});
var port = 4201;
var app = express();
var cors = require('cors');

const urlDB =process.env.DB_MONGO;

var server = require('http').createServer(app);
var io = require('socket.io')(server,{
    cors: {origin : '*'}
});


io.on('connection',function(socket){
    socket.on('delete-carrito',function(data){
        io.emit('new-carrito',data);
        console.log(data);
    });


    socket.on('add-carrito-add',function(data){
        io.emit('new-carrito-add',data);
        console.log('data soket');
        console.log(data);
    });
    
});


var cliente_route = require('./routes/cliente');
var admin_route = require('./routes/admin');
var producto_route = require('./routes/producto');
var carrito_route = require('./routes/carrito');
var artesano_routes = require('./routes/artesano');
var categoria_routes = require('./routes/categoria');

mongoose.connect(urlDB,{useUnifiedTopology: true, useNewUrlParser: true}, (err,res)=>{
try {
    console.log("Corriendo....");
    server.listen(port, function(){
        console.log("Servidor " + port );
    });
} catch (error) {
    console.log(error);
    
}
});

app.use(cors());

app.use(bodyparser.urlencoded({limit: '50mb',extended:true}));
app.use(bodyparser.json({limit: '50mb', extended: true}));


// app.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin','*'); 
//     res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
//     res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
//     next();
// });

app.use('/api',cliente_route);
app.use('/api',admin_route);
app.use('/api',producto_route);
app.use('/api',carrito_route);
app.use('/api',artesano_routes);
app.use('/api',categoria_routes);

module.exports = app;