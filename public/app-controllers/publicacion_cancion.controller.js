app.controller('publicacionCancionController', function($scope, cancionService, autentificacionService) {
        
        autentificacionService.getUsuarioAutentificado();

        if ($scope.usuario == null) {

            alert("No estas logueado");
            window.location = "/"; 
        }
        
        $scope.publicar = function() {

            var formData = {
                titulo: $scope.titulo,

                album: $scope.album,
                genero: $scope.genero,
                duracion: $scope.duracion,
                nombre: $scope.nombre,
                fecha_lanzamiento: $scope.fecha_lanzamiento,
                imagen: $scope.imagen,
                link_soundcloud: $scope.link_soundcloud

            }
    
            cancionService.crearCancion(formData, 
                // Success:
                function(res) {
                     
                    window.location = "#/canciones";   
                    
                }, 
                // Error:
                function(res) {

                    alert('Error: ' + res);
                });
        };
 
    });