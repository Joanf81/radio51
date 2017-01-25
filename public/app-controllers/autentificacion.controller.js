app.controller('autentificacionController', function($rootScope, $scope, $location, $localStorage, autentificacionService) {
        
        autentificacionService.getUsuarioAutentificado();

        $scope.login = function() {

            var formData = {
                usuario: $scope.usuario,
                pass: $scope.pass
            }
    
            autentificacionService.login(formData, function(res) {
                 
                if (res.token != null) {
                    $localStorage.token = res.token;
                    alert('Logueado correctamente');
                    window.location = "/";   
                }

            }, function() {

                alert('Usuario o contraseña incorrectos.');
            });
        }
 
        $scope.logout = function() {

            $localStorage.token = null;
            $rootScope.usuario = null;   
            $rootScope.logueado = 0; 
            window.location = "/";   
        };
    });