app.controller('modificarArtistaController', function($scope, artistaService, autentificacionService) {

    autentificacionService.getUsuarioAutentificado();

    if ($scope.usuario == null) {

        alert("No estas logueado");
        window.location = "/"; 
    }

    $scope.modificar = function() {

        var formData = {
            usuario: $scope.usuario.usuario,
            email: $scope.usuario.email,
            pass: $scope.usuario.pass,

            nombre_artistico: $scope.usuario.nombre_artistico,
            nombre: $scope.usuario.nombre,
            apellidos: $scope.usuario.apellidos,
            imagen: $scope.usuario.imagen,
            fecha_nacimiento: $scope.usuario.fecha_nacimiento,

            descripcion_corta: $scope.usuario.descripcion_corta,
            descripcion_larga: $scope.usuario.descripcion_larga

        }
    
        artistaService.modificarArtista($scope.usuario.id, formData, 
            // Success:
            function(res) {
                     
                window.location = "#/artista/" + $scope.usuario.id;    
            }, 
            // Error:
            function(res) {

                alert('Error: ' + res);
        });
    };

});