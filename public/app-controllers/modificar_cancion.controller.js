app.controller('modificarCancionController', function($scope, $routeParams, cancionService, autentificacionService) {

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

    $scope.modificar = function() {

        var formData = {
            titulo: $scope.cancion.titulo,

            album: $scope.cancion.album,
            genero: $scope.cancion.genero,
            duracion: $scope.cancion.duracion,
            fecha_lanzamiento: $scope.cancion.fecha_lanzamiento,

            imagen: $scope.cancion.imagen,
            link_soundcloud: $scope.cancion.link_soundcloud,
        }
    
        cancionService.modificarCancion($scope.usuario.id, formData, 
            // Success:
            function(res) {
                     
                window.location = "#/cancion/" + $scope.usuario.id;    
            }, 
            // Error:
            function(res) {

                alert('Error: ' + res);
        });
    };

});