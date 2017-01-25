// MODULO ARTISTA

var express = require('express');
var autentificador = require('../autentificacion/autentificador');

var artista = function(Artista, Comentario) {

  var router = express.Router();

  // Ver detalles de un artista (Al ser una operación pública el pass se oculta):
  router.get('/:id', function(req, res) {
    console.log('Ver detalles del artista ' + req.params.id);

    Artista.findById(req.params.id).then(function(result) {

      if (result != null) {
        res.pass = "****";

        res.status(200);
        res.send(result);

      } else {
        res.status(404);
        res.send("El artista solicitado no existe");
      }
    });
  });


  // Ver todos los artistas (devuelve la pagina pasada por :pag con numero de elementos indicado por :limit)
  router.get('/pagina/:pag/:limit', function(req, res) {
    console.log('Ver todos los artistas (página ' + req.params.pag + ')');

    var total_paginas;

    Artista.count().then(function(result) {
      total_paginas = Math.floor(result / req.params.limit);
      if (result % req.params.limit > 0) {
        total_paginas++;
      }
    });

    Artista.findAll({ offset: (req.params.pag - 1)*req.params.limit, limit: req.params.limit}).then(function(results){

      var pagina = {
        contenido: results,
        pagina_actual: req.params.pag,
        total_paginas: total_paginas
      };

      res.status(200);
      res.send(pagina);
    });
  });


  // crear nuevo artista:
  router.post('/', function(req, res) {
    console.log('Crear un artista');

    var nuevoArtista = req.body;

    if (nuevoArtista.usuario && nuevoArtista.pass && nuevoArtista.email) {
      Artista.create(nuevoArtista);
      res.status(201);
      res.send(nuevoArtista);

    } else {
      res.status(400);
      res.send("Faltan campos obligatorios por relllenar");
    }
  });


  // Modificar artista: (Necesario estar logueado, un artista solo puede modificarse a si mismo)
  router.put('/:id', autentificador.compruebaLogin, function(req, res) {
    console.log('Modificar artista ' + req.params.id);

    if (req.user == req.params.id) {

      var modificadoArtista = req.body;

      if (modificadoArtista.usuario && modificadoArtista.pass && modificadoArtista.email) {
        Artista.findById(req.params.id).then(function(result) {

          if (result != null) {

            result.usuario = modificadoArtista.usuario;
            result.email = modificadoArtista.email;
            result.pass = modificadoArtista.pass;

            result.nombre_artistico = modificadoArtista.nombre_artistico;
            result.nombre = modificadoArtista.nombre;
            result.apellidos = modificadoArtista.apellidos;
            result.imagen = modificadoArtista.imagen;
            result.descripcion_corta = modificadoArtista.descripcion_corta;
            result.descripcion_larga = modificadoArtista.descripcion_larga;
            result.fecha_nacimiento = modificadoArtista.fecha_nacimiento;

            result.save().then(function() {
              res.status(204);
              res.end();
            });
        
          } else {
            res.status(404);
            res.send("El artista que intenta modificar no existe");
          }
        });

      } else {
        res.status(400);
        res.send("Faltan campos obligatorios por relllenar");
      }
    } else {

      res.status(401);
      res.send("No tienes permiso para realizar esta acción");
    }
  });


  // Eliminar artista: (Necesario estar logueado, un artista solo puede eliminarse a si mismo)
  router.delete('/:id', autentificador.compruebaLogin, function(req, res) {
    console.log('Eliminar artista ' + req.params.id);

    if (req.user == req.params.id) {

      Artista.findById(req.params.id).then(function(result) {

        if (result != null) {

          result.destroy().then(function() {
            res.status(204);
            res.end();
          });

        } else {
          res.status(404);
          res.send("El artista que intenta eliminar no existe");
        }
      });
    } else {

      res.status(401);
      res.send("No tienes permiso para realizar esta acción");
    }
  });


  
  ///////// ------- ACCIONES RELACIONADAS CON CANCIONES

  // Ver todas las canciones del artista pasado por id: (devuelve la pagina pasada por :pag con numero de elementos indicado por :limit)
  router.get('/:id/canciones/pagina/:pag/:limit', function(req, res) {
    console.log('Ver canciones del artista ' + req.params.id);

    Artista.findById(req.params.id).then(function(result){

      if (result != null) {

        result.getCanciones().then(function(canciones) {

          var n_paginas = Math.floor(canciones.length / req.params.limit);
          if (canciones.length % req.params.limit > 0) {
            n_paginas++;
          }

          var lim1 = (req.params.pag-1)*req.params.limit;
          var lim2 = ((req.params.pag-1)*req.params.limit)+parseInt(req.params.limit);

          var pagina = {
            contenido: canciones.slice(lim1, lim2),
            pagina_actual: req.params.pag,
            total_paginas: n_paginas
          };

          res.status(200);
          res.send(pagina);
        });

      } else {
        res.status(404);
        res.send("El artista solicitado no existe");
      }
  	});
  });



  ///////// ------- ACCIONES RELACIONADAS CON COMENTARIOS

  // Ver todos los comentarios del artista pasado por id: (devuelve la pagina pasada por :pag con numero de elementos indicado por :limit)
  router.get('/:id/comentarios/pagina/:pag/:limit', function(req, res) {
    console.log('Ver comentarios del artista ' + req.params.id);

    Artista.findById(req.params.id).then(function(result){
    	
      if (result != null) {

        result.getComentarios().then(function(comentarios) {
          var n_paginas = Math.floor(comentarios.length / req.params.limit);
          if (comentarios.length % req.params.limit > 0) {
            n_paginas++;
          }

          var lim1 = (req.params.pag-1)*req.params.limit;
          var lim2 = ((req.params.pag-1)*req.params.limit)+parseInt(req.params.limit);

          var pagina = {
            contenido: comentarios.slice(lim1, lim2),
            pagina_actual: req.params.pag,
            total_paginas: n_paginas
          };

           console.log(lim2);

          res.status(200);
          res.send(pagina);
        });

      } else {
        res.status(404);
        res.send("El artista solicitado no existe");
      }
    });
  });


  // Comentar Artista: (Crear comentario)
  router.post('/:id/comentar', function(req, res) {
    console.log('Comentar un artista');

    Artista.findById(req.params.id).then(function(result){

      if (result != null) {

        var nuevoComentario = req.body;

        if (nuevoComentario.contenido && nuevoComentario.autor) {

          nuevoComentario.ArtistaId = req.params.id;
          Comentario.create(nuevoComentario);
          res.status(201);
          res.send(nuevoComentario);

        } else {
          res.status(400);
          res.send("Faltan campos obligatorios por relllenar");
        }

      } else {
        res.status(404);
        res.send("El artista que intenta comentar no existe");
      }
    });
  });


  return router;
}

module.exports = artista;