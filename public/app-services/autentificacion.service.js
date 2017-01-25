
app.factory('autentificacionService', function($rootScope, $http, $localStorage) {
 
        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        var get_perfil = function(data, success, error) {
                            $http.post('/autentificacion/perfil', data).success(success).error(error);
                         }

        var do_login = function(data, success, error) {
                            $http.post('/autentificacion', data).success(success).error(error);
                        }

        return {
            login: do_login,
            perfil: get_perfil,
            getUsuarioAutentificado: function() {
                if ($localStorage.token != null ) {
                    if ($rootScope.logueado != 1 || $rootScope.usuario == null) {

                        var formData = {
                            token: $localStorage.token
                        }
                        
                        get_perfil(formData, 

                            // Success:
                            function(res) {
                                $rootScope.usuario = res;   
                                $rootScope.logueado = 1;   

                            // Error:
                            }, function() {
                                $rootScope.usuario = null;
                                $rootScope.logueado = 0;  
                               
                        });
                    }

                } else {
                    $rootScope.usuario = null;
                    $rootScope.logueado = 0;

                }
            }
        };
});