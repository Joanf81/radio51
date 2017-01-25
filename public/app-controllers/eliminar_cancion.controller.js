app.controller('eliminarCancionController', function($scope, $routeParams, cancionService, autentificacionService) {
        
    autentificacionService.getUsuarioAutentificado();

    if ($scope.usuario == null) {

        alert("No estas logueeado");
        window.location = "/"; 
    }

    cancionService.getDatosCancion($routeParams.idCancion,
        //Success:
        function(data) {

            if ($scope.usuario.id == data.ArtistaId) {

                $scope.cancion = data;

            } else {
                alert("Debes estar logueado como el autor de la cancion");
                window.location = "/";
            }  
        },
        //Error
        function() {

            $scope.cancion = null;
        });

    $scope.eliminarCancion = function() {

        
        cancionService.eliminarCancion($scope.cancion.id, 
            // Success:
            function(res) {
                     
                window.location = "#/artista/" + $scope.usuario.id + "/canciones";    
            }, 
            // Error:
            function(res) {

                alert('Error: ' + res);
        });
    };
 
});