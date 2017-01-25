app.controller('bajaArtistaController', function($rootScope, $scope, $localStorage, artistaService, autentificacionService) {
        
    autentificacionService.getUsuarioAutentificado();

    if ($scope.usuario == null) {

        alert("No estas logueado");
         window.location = "/"; 
    }
        
    $scope.baja = function() {

        if ($scope.usuario != null) {

            artistaService.eliminarArtista($scope.usuario.id,
                // Success:
                function(data) {
                    alert("Eliminado correctamente");
                    $localStorage.token = null;
                    $rootScope.usuario = null;   
                    $rootScope.logueado = 0; 
                    window.location = "/"; 
                 },
                 // Error:
                  function(data) { alert("Error:" + data); }
            );
        }
    }
 
});