
var Cancion = function(Sequelize, sequelize) {

	return sequelize.define('Cancion', {

    	titulo: Sequelize.STRING,
    	genero: Sequelize.STRING,
    	duracion: Sequelize.INTEGER,
    	album: Sequelize.STRING,
    	fecha_lanzamiento: Sequelize.DATEONLY,
    	imagen: Sequelize.STRING,
    	link_soundcloud: Sequelize.STRING
	}, {
		name: {singular: 'Cancion', plural: 'Canciones'}
	});
}

module.exports = Cancion;
