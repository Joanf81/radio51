var Comentario = function(Sequelize, sequelize) {

	return sequelize.define('Comentario', {

    	autor: Sequelize.STRING,
    	contenido: Sequelize.STRING,
    	fecha_publicacion: Sequelize.STRING
	}, {
		name: {singular: 'Comentario', plural: 'Comentarios'}
	});
}

module.exports = Comentario;
