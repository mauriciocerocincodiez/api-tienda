'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'mauricio';

exports.createToken = function(user){
var payload = {
    sub : user._id,
    nombres: user.nombres,
    apellidos: user.apellidos,
    email: user.email,
    rol: user.rol,
    iat: moment().unix(),
    exp: moment().add(50, 'years').unix()
}

return jwt.encode(payload, secret);

}