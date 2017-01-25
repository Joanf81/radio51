app.factory("artistaService", function($http, restApiRoutes) {

  return {
    getPaginaArtistas: function(num_pag, num_artistas, success, error) {
      $http.get(restApiRoutes.Artista+'/pagina/'+num_pag+'/'+num_artistas).success(success).error(error);   
    },
    getDatosArtista: function(id_artista, success, error) {
      $http.get(restApiRoutes.Artista+'/'+id_artista).success(success).error(error);  
    },
    getPaginaCanciones: function(id_artista, num_pag, num_canciones, success, error) {
      $http.get(restApiRoutes.Artista+'/'+id_artista+'/canciones/pagina/'+num_pag+'/'+num_canciones).success(success).error(error);  
    },
    crearArtista: function(artista, success, error) {
      $http.post(restApiRoutes.Artista+'/', artista).success(success).error(error);
    },
    modificarArtista: function(artista_id, artista, success, error) {
      $http.put(restApiRoutes.Artista+'/'+artista_id, artista).success(success).error(error);
    },
    eliminarArtista: function(id_artista, success, error) {
      $http.delete(restApiRoutes.Artista+'/'+id_artista).success(success).error(error);
    },
    getPaginaComentarios: function(id_artista, num_pag, num_artistas, success, error) {
      $http.get(restApiRoutes.Artista+'/'+id_artista+'/comentarios/pagina/'+num_pag+'/'+num_artistas).success(success).error(error);  
    },
    comentarArtista: function(id_artista, comentario, success, error) {
      $http.post(restApiRoutes.Artista+'/'+id_artista+'/comentar', comentario).success(success).error(error);
    }
  }
});