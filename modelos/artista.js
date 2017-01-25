
Sequelize = require('sequelize');

var Artista = function(Sequelize, sequelize) {

	return sequelize.define('Artista', {

		// Campos obligatorios (Datos para login, como usuario se podrá usar nombre_artistico o email)
		usuario: Sequelize.STRING, 
		email: Sequelize.STRING,
    	pass: Sequelize.STRING,

    	nombre_artistico: Sequelize.STRING, // Nombre mostrado en la aplicacion. Si es null, se mostrará usuario
    	nombre: Sequelize.STRING,
    	apellidos: Sequelize.STRING,
    	imagen: Sequelize.STRING,
    	descripcion_corta: Sequelize.STRING,
        descripcion_larga: Sequelize.STRING,
    	fecha_nacimiento: Sequelize.DATEONLY

    	// Artista (0, N) --------- (1, 1) Cancion
    	// Artista (0, N) --------- (0, 1) Comentario
	}, {
		name: {singular: 'Artista', plural: 'Artistas'}
	});
}

module.exports = Artista;
