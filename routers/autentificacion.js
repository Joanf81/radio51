// MODULO AUTENTIFICACION

var express = require('express');
var token = require('../autentificacion/token');
var config = require('../autentificacion/secret');
var jwt = require('jwt-simple');  
var moment = require('moment');  


var autentificacion = function(Artista) {

  var router = express.Router();

  // Autentificación mediante JSON Web Token:
  router.post('/', function(req, res) {
    console.log('Autentificación');

    Artista.findAll({
      where: {
        usuario: req.body.usuario
      }
    }).then(function(user) {

      // Si el usuario existe:
      if (user[0] != null) {

        // Si la contraseña es correcta:
        if (user[0].pass == req.body.pass) {
          res.status(200);
          res.send({token: token.createToken(user[0])});
          return res;

        // Si no es correcta:
        } else {
          
          res.status(403);
          res.send("Usuario o contraseña incorrectos.");
          return res;
        }

      // Si el usuario no existe:
      } else {
          
        res.status(403);
        res.send("Usuario o contraseña incorrectos.");
        return res;
      }
    });
  });

  router.post('/perfil', function(req, res) {

    var token = req.body.token;
    var payload = jwt.decode(token, config.TOKEN_SECRET);

    if(payload.exp <= moment().unix()) {
      return res
          .status(401)
          .send({message: "El token ha expirado"});
    }

    Artista.findById(payload.sub).then(function(result) {

       if (result != null) {
        res.status(200);
        res.send(result);

      } else {
        res.status(404);
        res.send("El Artista no exisite");
      } 
    });
  });

  return router;
}

module.exports = autentificacion;