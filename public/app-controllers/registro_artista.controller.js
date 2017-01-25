app.controller('registroArtistaController', function($scope, artistaService) {

    $scope.registro = function() {

            var formData = {
                usuario: $scope.usuario,
                email: $scope.email,
                pass: $scope.pass,

                nombre_artistico: $scope.nombre_artistico,
                nombre: $scope.nombre,
                apellidos: $scope.apellidos,
                imagen: $scope.imagen,
                fecha_nacimiento: $scope.fecha_nacimiento,

                descripcion_corta: $scope.descripcion_corta,
                descripcion_larga: $scope.descripcion_larga

            }
    
            artistaService.crearArtista(formData, 
                // Success:
                function(res) {
                     
                    window.location = "#/artistas";   
                    
                }, 
                // Error:
                function(res) {

                    alert('Error: ' + res);
                });
        };

});