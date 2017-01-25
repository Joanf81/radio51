app.controller('listaCancionesArtistaController', function($scope, $routeParams, artistaService, autentificacionService) {
    
    $scope.canciones_por_pagina = 10;

    var obtenerPaginaMisCanciones = function(pagina, canciones_por_pagina) {

        artistaService.getPaginaCanciones($routeParams.idArtista, pagina, canciones_por_pagina,
            // Succes:
            function(data) {
                $scope.canciones = data.contenido;
                $scope.pagina_actual = parseInt(data.pagina_actual);
                $scope.pagina_ultima = parseInt(data.total_paginas);
            },
            // Error:
            function() {
                $scope.pagina_actual = -1;
                $scope.canciones = null;
            }
        );
    }

    $scope.siguientePagina = function(paginas_adelante) {

        obtenerPaginaMisCanciones($scope.pagina_actual + paginas_adelante, $scope.canciones_por_pagina);
    }

    $scope.anteriorPagina = function(paginas_atras) {

        obtenerPaginaMisCanciones($scope.pagina_actual - paginas_atras, $scope.canciones_por_pagina);
    }

    $scope.primeraPagina = function() {

        obtenerPaginaMisCanciones(1, $scope.canciones_por_pagina);
    }

    $scope.ultimaPagina = function() {

        obtenerPaginaMisCanciones($scope.pagina_ultima, $scope.canciones_por_pagina);
    }

    obtenerPaginaMisCanciones(1, $scope.canciones_por_pagina);
});