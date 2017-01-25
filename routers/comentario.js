// MODULO COMENTARIO

var express = require('express');

var comentario = function(Comentario) {

  var router = express.Router();

  // Ver detalles del comentario pasado por id:
  router.get('/:id', function(req, res) {
    console.log('Ver detalles del comentario ' + req.params.id);

    Comentario.findById(req.params.id).then(function(result) {

      if (result != null) {
        res.status(200);
        res.send(result);

      } else {
        res.status(404);
        res.send("El coemntario solicitado no existe");
      }
    });
  });


  /* // Eliminar comentario: (Acción para implementar en el futuro)
        Solo administradores y superadministrador podrán eliminar comentarios
  router.delete('/:id', function(req, res) {
    console.log('Eliminar comentario ' + req.params.id);

    Comentario.findById(req.params.id).then(function(result) {

      result.destroy().then(function() {
        res.status(204);
      });
    });
    res.end();
  });
*/

  return router;
}

module.exports = comentario;