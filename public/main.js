var app = angular.module('app', ['ngRoute', 'ngStorage']);
app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            controller: 'artistaController',
            templateUrl: 'app-templates/principal.template.html'
        })

        ////////// PAGINAS DE ARTISTA //////////////

        .when('/artistas', {
            controller: 'listaArtistasController',
            templateUrl: 'app-templates/lista_artistas.template.html'
        })
        .when('/artista/:idArtista', {
            controller: 'perfilArtistaController',
            templateUrl: 'app-templates/perfil_artista.template.html'
        })
        .when('/registro', {
            controller: 'registroArtistaController',
            templateUrl: 'app-templates/registro_artista.template.html'
        })
        .when('/modificar-perfil', {
            controller: 'modificarArtistaController',
            templateUrl: 'app-templates/modificar_artista.template.html'
        })
        .when('/baja', {
            controller: 'bajaArtistaController',
            templateUrl: 'app-templates/baja_artista.template.html'
        })

        ////////// PAGINAS DE CANCIÓN ////////////////

        .when('/canciones', {
            controller: 'listaTodasCancionesController',
            templateUrl: 'app-templates/lista_canciones.template.html'
        })
        .when('/cancion/:idCancion', {
            controller: 'cancionController',
            templateUrl: 'app-templates/cancion.template.html'
        })
        .when('/artista/:idArtista/canciones', {
            controller: 'listaCancionesArtistaController',
            templateUrl: 'app-templates/lista_canciones.template.html'
        })
        .when('/publicar-cancion', {
            controller: 'publicacionCancionController',
            templateUrl: 'app-templates/publicacion_cancion.template.html'
        })
        .when('/modificar-cancion/:idCancion', {
            controller: 'modificarCancionController',
            templateUrl: 'app-templates/modificar_cancion.template.html'
        })
        .when('/eliminar-cancion/:idCancion', {
            controller: 'eliminarCancionController',
            templateUrl: 'app-templates/eliminar_cancion.template.html'
        })



        .otherwise({
            redirectTo: '/'
        });

    
    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                    'request': function (config) {
                        config.headers = config.headers || {};
                        if ($localStorage.token) {
                            config.headers.Authorization = $localStorage.token;
                        }
                        return config;
                    },
                    'responseError': function(response) {
                        if(response.status === 401 || response.status === 403) {
                            $location.path('/');
                        }
                        return $q.reject(response);
                    }
                };
    }]);
});

app.controller('mainController', function($rootScope, $location) {

    $rootScope.go = function(url) {

        $location.path(url);
    }
});




