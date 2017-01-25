app.factory("cancionService", function($http, restApiRoutes) {

  return {
    getPaginaTodasCanciones: function(num_pag, num_artistas, success, error) {
      $http.get(restApiRoutes.Cancion+'/pagina/'+num_pag+'/'+num_artistas).success(success).error(error);   
    },
    getDatosCancion: function(id_cancion, success, error) {
      $http.get(restApiRoutes.Cancion+'/'+id_cancion).success(success).error(error);  
    },
    crearCancion: function(cancion, success, error) {
      $http.post(restApiRoutes.Cancion+'/', cancion).success(success).error(error);
    },
    modificarCancion: function(cancion_id, cancion, success, error) {
      $http.put(restApiRoutes.Cancion+'/'+cancion_id, cancion).success(success).error(error);
    },
    eliminarCancion: function(id_cancion, success, error) {
      $http.delete(restApiRoutes.Cancion+'/'+id_cancion).success(success).error(error);
    },
    getPaginaComentarios: function(id_cancion, num_pag, num_canciones, success, error) {
      $http.get(restApiRoutes.Cancion+'/'+id_cancion+'/comentarios/pagina/'+num_pag+'/'+num_canciones).success(success).error(error);  
    },
    comentarCancion: function(id_cancion, comentario, success, error) {
      $http.post(restApiRoutes.Cancion+'/'+id_cancion+'/comentar', comentario).success(success).error(error);
    }
  }
});