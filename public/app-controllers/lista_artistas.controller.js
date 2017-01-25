
app.controller('listaArtistasController', function($scope, artistaService, restApiRoutes) {

    $scope.artistas_por_pagina = 10;

    var obtenerPaginaArtistas = function(pagina, artistas_por_pagina) {

        artistaService.getPaginaArtistas(pagina, artistas_por_pagina,
            // Succes:
            function(data) {
                $scope.artistas = data.contenido;
                $scope.pagina_actual = parseInt(data.pagina_actual);
                $scope.pagina_ultima = parseInt(data.total_paginas);
            },
            // Error:
            function() {
                $scope.pagina_actual = -1;
                $scope.artistas = null;
            }
        );
    }

    $scope.siguientePagina = function(paginas_adelante) {

        obtenerPaginaArtistas($scope.pagina_actual + paginas_adelante, $scope.artistas_por_pagina);
    }

    $scope.anteriorPagina = function(paginas_atras) {

        obtenerPaginaArtistas($scope.pagina_actual - paginas_atras, $scope.artistas_por_pagina);
    }

    $scope.primeraPagina = function() {

        obtenerPaginaArtistas(1, $scope.artistas_por_pagina);
    }

    $scope.ultimaPagina = function() {

        obtenerPaginaArtistas($scope.pagina_ultima, $scope.artistas_por_pagina);
    }

    obtenerPaginaArtistas(1, $scope.artistas_por_pagina);
});
