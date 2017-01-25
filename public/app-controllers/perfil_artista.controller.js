
app.controller('perfilArtistaController', function($scope, $location, $routeParams, artistaService) {

    artistaService.getDatosArtista($routeParams.idArtista,
    	// Success:
    	function(data) {
        	$scope.artista = data;
    	},
    	// Error:
    	function(data) { }
    );

    $scope.comentar = function(id_artista) {

    	formData = {
    		autor: $scope.autor_comentario,
    		contenido: $scope.contenido_comentario,
    		fecha_publicacion: "aa-aa-aaaa"
    	}

    	artistaService.comentarArtista(id_artista, formData,
    		// Success:
    		function(data) {
        		window.location.reload();
    		},
    		// Error:
    		function(data) { }
    	);
    } 
    
    $scope.comentarios_por_pagina = 6;

    var obtenerPaginaComentarios = function(pagina, comentarios_por_pagina) {

        artistaService.getPaginaComentarios($routeParams.idArtista, pagina, comentarios_por_pagina,
            // Succes:
            function(data) {
                $scope.comentarios = data.contenido;
                $scope.pagina_actual = parseInt(data.pagina_actual);
                $scope.pagina_ultima = parseInt(data.total_paginas);
            },
            // Error:
            function() {
                $scope.pagina_actual = -1;
                $scope.comentarios = null;
            }
        );
    }

    $scope.siguientePagina = function(paginas_adelante) {

        obtenerPaginaComentarios($scope.pagina_actual + paginas_adelante, $scope.comentarios_por_pagina);
    }

    $scope.anteriorPagina = function(paginas_atras) {

        obtenerPaginaComentarios($scope.pagina_actual - paginas_atras, $scope.comentarios_por_pagina);
    }

    $scope.primeraPagina = function() {

        obtenerPaginaComentarios(1, $scope.comentarios_por_pagina);
    }

    $scope.ultimaPagina = function() {

        obtenerPaginaComentarios($scope.pagina_ultima, $scope.comentarios_por_pagina);
    }

    $scope.primeraPagina();

});