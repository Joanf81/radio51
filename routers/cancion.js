// MODULO CANCION

var express = require('express');
var autentificador = require('../autentificacion/autentificador');

var n_paginacion = 10;

var cancion = function(Cancion, Comentario) {

  var router = express.Router();

  // Ver detalles de una canción:
  router.get('/:id', function(req, res) {
    console.log('Ver detalles de la cancion ' + req.params.id);

    Cancion.findById(req.params.id).then(function(result) {
 
      if (result != null) {

        res.status(200);
        res.send(result);

      } else {
        res.status(404);
        res.send("La canción solicitada no existe");
      } 
    });
  });


  // Ver todas las canciones (devuelve la página pasada por :pag)
  router.get('/pagina/:pag/:limit', function(req, res) {
    console.log('Ver todas las canciones (página ' + req.params.pag + ')');

    var total_paginas;

    Cancion.count().then(function(result) {
      total_paginas = Math.floor(result / req.params.limit);
      if (result % req.params.limit > 0) {
        total_paginas++;
      }
    });

    Cancion.findAll({ offset: (req.params.pag - 1)*req.params.limit, limit: req.params.limit}).then(function(results){

      var pagina = {
        contenido: results,
        pagina_actual: req.params.pag,
        total_paginas: total_paginas
      };

      res.status(200);
      res.send(pagina);
    });
  });


  // Crear nueva canción: (Necesario estar logueado, la canción se crea con el id del artista logueado)
  router.post('/', autentificador.compruebaLogin, function(req, res) {
    console.log('Crear una cancion');

    var nuevoCancion = req.body;

    if (nuevoCancion.titulo) {

      nuevoCancion.ArtistaId = req.user;
      Cancion.create(nuevoCancion);
      res.status(201);
      res.send(nuevoCancion);

    } else {
      res.status(400);
      res.send("Faltan campos obligatorios por relllenar");
    }
  });


  // Modificar canción: (Necesario estar logueado como el propietario de la canción)
  router.put('/:id', autentificador.compruebaLogin, function(req, res) {
    console.log('Modificar cancion ' + req.params.id);

    var modificadoCancion = req.body;

    if (modificadoCancion.titulo) {
      Cancion.findById(req.params.id).then(function(result) {

        if (result != null) {

          if (result.ArtistaId = req.user) {

            result.titulo = modificadoCancion.titulo;
            result.genero = modificadoCancion.genero;
            result.duracion = modificadoCancion.duracion;
            result.album = modificadoCancion.album;
            result.fecha_lanzamiento = modificadoCancion.fecha_lanzamiento;
            result.imagen = modificadoCancion.imagen;
            result.link_soundcloud = modificadoCancion.link_soundcloud;

            result.save().then(function() {
              res.status(204);
              res.end();
            });

          } else {
            res.status(401);
            res.send("No tienes permiso para realizar esta acción");
          }
        } else {
          res.status(404);
          res.send("La canción que intenta modificar no existe");
        }
      });

    } else {
      res.status(400);
      res.send("Faltan campos obligatorios por relllenar");
    }
  });


  // Eliminar canción: (Necesario estar logueado como el propietario de la canción)
  router.delete('/:id', autentificador.compruebaLogin, function(req, res) {
    console.log('Eliminar cancion ' + req.params.id);

    Cancion.findById(req.params.id).then(function(result) {

      if (result != null) {

        if (result.ArtistaId = req.user) {

          result.destroy().then(function() {
            res.status(204);
            res.end();
          });

        } else {
          res.status(401);
          res.send("No tienes permiso para realizar esta acción");
        }
      } else {
        res.status(404);
        res.send("La canción que intenta eliminar no existe");
      }
    });
  })



  ///////// ------- ACCIONES RELACIONADAS CON COMENTARIOS

  // Ver todos los comentarios de la cancion pasada por id: (devuelve la pagina pasada por :pag con numero de elementos indicado por :limit)
  router.get('/:id/comentarios/pagina/:pag/:limit', function(req, res) {
    console.log('Ver comentarios de la cancion' + req.params.id);

    Cancion.findById(req.params.id).then(function(result){
      
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
        res.send("La canción solicitada no existe");
      }
    });
  });


  // Comentar Cancion: (Crear comentario)
  router.post('/:id/comentar', function(req, res) {
    console.log('Comentar una cancion');

    Cancion.findById(req.params.id).then(function(result){

      if (result != null) {

        var nuevoComentario = req.body;

        if (nuevoComentario.contenido && nuevoComentario.autor) {
          nuevoComentario.CancionId = req.params.id;
          Comentario.create(nuevoComentario);
          res.status(201);
          res.send(nuevoComentario);

        } else {
          res.status(400);
          res.send("Faltan campos obligatorios por relllenar");
        }

      } else {
        res.status(404);
        res.send("La canción que intenta comentar no existe");
      }
    });
  });

  return router;
}

module.exports = cancion;