
app.controller('listaTodasCancionesController', function($scope, cancionService, restApiRoutes) {
    
    $scope.canciones_por_pagina = 10;

    var obtenerPaginaTodasCanciones = function(pagina, canciones_por_pagina) {

        cancionService.getPaginaTodasCanciones(pagina, canciones_por_pagina,
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

        obtenerPaginaTodasCanciones($scope.pagina_actual + paginas_adelante, $scope.canciones_por_pagina);
    }

    $scope.anteriorPagina = function(paginas_atras) {

        obtenerPaginaTodasCanciones($scope.pagina_actual - paginas_atras, $scope.canciones_por_pagina);
    }

    $scope.primeraPagina = function() {

        obtenerPaginaTodasCanciones(1, $scope.canciones_por_pagina);
    }

    $scope.ultimaPagina = function() {

        obtenerPaginaTodasCanciones($scope.pagina_ultima, $scope.canciones_por_pagina);
    }

    obtenerPaginaTodasCanciones(1, $scope.canciones_por_pagina);
});