
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var Sequelize = require('sequelize');
var sequelize = new Sequelize('db','','', {
    dialect:'sqlite',
    storage:'db.sqlite',
});

// Configuracion de la app:
//Indicamos donde se encuentran los ficheros html estaticos
app.use(express.static(__dirname + '/public'));
// parse application/x-www-form-urlencoded             
app.use(bodyParser.urlencoded({'extended':'true'}));   
// parse application/json         
app.use(bodyParser.json());                                     


// Importamos los modelos:
var Artista = require("./modelos/artista")(Sequelize, sequelize);
var Cancion = require("./modelos/cancion")(Sequelize, sequelize);
var Comentario = require("./modelos/comentario")(Sequelize, sequelize);


// Relacionamos los modelos Artista - Cancion en una relacion 1-N:
Artista.hasMany(Cancion);
Cancion.belongsTo(Artista, {
  constraints:false
});

// Relacionamos los modelos Cancion - Comentario en una relacion 1-N:
Cancion.hasMany(Comentario);
Comentario.belongsTo(Cancion, {
  constraints:false
});

// Relacionamos los modelos Artista - Comentario en una relacion 1-N:
Artista.hasMany(Comentario);
Comentario.belongsTo(Artista, {
  constraints:false
});


// Importamos los routers:
var artistaApp = require('./routers/artista')(Artista, Comentario);
var cancionApp = require('./routers/cancion')(Cancion, Comentario);
var comentarioApp = require('./routers/comentario')(Comentario);
var autentificacionApp = require('./routers/autentificacion')(Artista);

// Montamos los routers en sus respectivas direcciones:
app.use('/artista', artistaApp);
app.use('/cancion', cancionApp);
app.use('/comentario', comentarioApp);
app.use('/autentificacion', autentificacionApp);


var request = require('request');

app.set('view engine', 'html');
app.engine('html', require('hbs').__express); 


//Peticiones de la aplicacion sin framework MCV:

app.get('/no-angular/index', function(pet, resp) {

	request('http://localhost:8080/artista/pagina/1/5', function(error, resp_api, body_api) {

		//Añadimos numero de apgina anterior y siguiente:
		var objeto_pagina = JSON.parse(body_api);
		if (objeto_pagina.pagina_actual > 1) {
			objeto_pagina.pagina_anterior = parseInt(objeto_pagina.pagina_actual) - 1;
		} else {
			objeto_pagina.pagina_anterior = 1;
		}
		if (objeto_pagina.pagina_actual < objeto_pagina.total_paginas) {
			objeto_pagina.pagina_siguiente = parseInt(objeto_pagina.pagina_actual) + 1;
		} else {
			objeto_pagina.pagina_siguiente = objeto_pagina.total_paginas;
		}

		resp.render('index.html', {pagina: objeto_pagina});
	});
});

app.get('/no-angular/index/pag/:pag/:limit', function(pet, resp) {

	request('http://localhost:8080/artista/pagina/'+pet.params.pag+'/'+pet.params.limit, function(error, resp_api, body_api) {

		//Añadimos numero de apgina anterior y siguiente:
		var objeto_pagina = JSON.parse(body_api);
		if (objeto_pagina.pagina_actual > 1) {
			objeto_pagina.pagina_anterior = parseInt(objeto_pagina.pagina_actual) - 1;
		} else {
			objeto_pagina.pagina_anterior = 1;
		}
		if (objeto_pagina.pagina_actual < objeto_pagina.total_paginas) {
			objeto_pagina.pagina_siguiente = parseInt(objeto_pagina.pagina_actual) + 1;
		} else {
			objeto_pagina.pagina_siguiente = objeto_pagina.total_paginas;
		}
		
		resp.render('index.html', {pagina: objeto_pagina});
	});
});


// Para cualquier otra direccion, redirigimos al modulo principal de angular

app.get('*', function(req, res) {  
    res.sendfile('./public/index.html');                
});


// Creamos algunas entradas en la DB y ponemos la aplicacion a la escucha.
sequelize.sync({force:true}).then(function(){
	return Artista.create({usuario:'TheDoors', pass: 'TheDoors', email: 'doors@gmail.com',
						   imagen: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Doors_electra_publicity_photo.JPG', 
						   descripcion_corta: 'The Doors fue una banda de rock estadounidense, formada en Los Ángeles (California), en julio del año 1965 y disuelta en el año 1973. Junto a Jefferson Airplane, Grateful Dead y Pink Floyd, se convirtió en uno de los máximos exponentes de la psicodelia de los años 60.',
						   descripcion_larga: "La banda tomó su nombre de un verso del poeta William Blake: 'If the doors of perception were cleansed, every thing would appear to man as it is: infinite.' (Si las puertas de la percepción fueran depuradas, todo aparecería ante el hombre tal cual es: infinito), que también daba título al libro de Aldous Huxley, The Doors of Perception. <br>The Doors se diferenciaba de muchos grupos de rock de la época, porque no usaban un bajo en concierto, enfatizando también el hecho de haber sido influidos por diferentes grupos de rock de la época, así como el destacado género del blues. En vez de esto, Manzarek tocaba las melodías del bajo con la mano izquierda en su novedoso piano Fender Rhodes, una nueva versión del ya conocido piano Fender Rhodes, y las melodías del órgano con la mano derecha. Sin embargo, el grupo usó algunos bajistas en sus grabaciones de estudio, entre ellos Jerry Scheff, quien tocó luego en más de 1,100 conciertos para Elvis Presley (de 1969 hasta su muerte en 1977), así como Doug Lubahn, Harvey Brooks, Kerry Magness, Lonnie Mack y Ray Neapolitan. <br>El logotipo de The Doors, diseñado por un asistente de Elektra Records, apareció por primera vez en su álbum de debut en 1967. <br>Muchas de las canciones originales se hicieron en conjunto. Morrison aportaba las letras y parte de la melodía, y el resto contribuía con el ritmo y el sentimiento de la canción. Mientras Morrison y Manzarek caminaban por la playa en California, vieron pasar a una mujer negra, y Morrison escribió la letra de 'Hello, I Love You' esa misma noche, refiriéndose a ella como la 'joya oscura' (dusky jewel). Algunos criticaron la canción por su parecido con el hit de The Kinks 'All Day and All of the Night' (1965), y el vocalista de este grupo, Ray Davies demandó a The Doors.",
						   nombre_artistico: 'The Doors'});
}).then(function(artista1){
	Cancion.bulkCreate([
		{titulo:'Strange days', album: 'Strange Days', genero: 'Rock psicodelico', fecha_lanzamiento: '1967', 
		imagen: 'https://upload.wikimedia.org/wikipedia/en/f/fc/AlbumStrangeDays.jpg',
		ArtistaId: artista1.id},
		{titulo:'When the music over', album: 'Strange Days', duracion: '10:55', genero: 'Rock psicodelico', fecha_lanzamiento: '1967',
		imagen: 'https://upload.wikimedia.org/wikipedia/en/f/fc/AlbumStrangeDays.jpg', 
		ArtistaId: artista1.id}
	]);
	Comentario.bulkCreate([
		{contenido:'Muy buen grupo!', autor:'Pepito19', fecha_publicacion:'18-10-2015', ArtistaId:artista1.id},
		{contenido:'De los mejores grupos de la historia', autor:'Joaquin Jimenez', fecha_publicacion:'18-06-2014', ArtistaId:artista1.id}
	]);
}).then(function(){
	return Artista.create({usuario:'Netsky', pass: 'Netsky', email: 'netsky@gmail.com',
						   imagen: 'http://static1.1.sqspcdn.com/static/f/308931/18950780/1340687523397/Embrace+Boston+Presents+HOSPITALITY-3.14.12+289.jpg', 
						   descripcion_corta: 'Boris Daenen (born 22 March 1989), better known as Netsky, is a Belgian drum and bass producer and musician. The name Netsky is based on the computer virus of the same name.',
						   descripcion_larga: "Netsky produces music of the liquid funk style – drum and bass music with many instrumental layers and frequent vocals. High Contrast's 'Gold Digger' remix was a major influence on him.In late 2009, Netsky signed a recording contract with Hospital Records, the same label as other well known liquid artists such as High Contrast and London Elektricity. <br>He also won a nomination as 'Best Upcoming Producer' within just months of his first release at the Drum + Bass Arena Awards.Hospital Records released Netsky's self-titled debut album on 31 May 2010. <br>His second album, titled 2, was released on 25 June 2012. The album features three singles and a deluxe edition was later released supported by a fourth single, 'We Can Only Live Today (Puppy)'.",
						   nombre_artistico: 'Netsky'});
}).then(function(artista2){
	return Cancion.create({titulo:'Detonate', album: 'Netksy 2', genero: 'Drum & bass', fecha_lanzamiento: '2012',
						   imagen: 'https://i1.sndcdn.com/artworks-000079317121-lpllzi-t500x500.jpg',
	 					   ArtistaId:artista2.id});
}).then(function(cancion) {
	Comentario.bulkCreate([
		{contenido:'Viva el drum & bass!', autor: 'Joan', fecha_publicacion:'18-10-2015', CancionId:cancion.id},
		{contenido:'Esta es de mis canciones favoritas', autor: 'Andy c', fecha_publicacion:'18-10-2015', CancionId:cancion.id}
	]);

}).then(function(){
	app.listen(8080, function(){
		console.log('Aplicación a la escucha en el puerto 8080');
	});
});

