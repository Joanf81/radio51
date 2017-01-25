#Radio51 Web Application

##Introducción
Esta es una pequeña aplicación web creada para una práctica de la universiadad, que consiste en una mini red social enfocada a artistas músicales. Esta aplicación permite registrarse como artista y publicar canciones, por otra parte, permite a los usuarios no registrados ver el perfil de los artistas, sus canciones, y escribir comentarios tanto en los perfiles de dichos artistas como en sus canciones.

Para el desarrollo de la aplicación se ha usado una combinación de varias tecnologías y lenguajes que se detallaran mas adelante, aunque es importante concretar que uno de los objetivos de la práctica era usar Javascript como lenguaje de programación tanto en el frontside como en el backside.

##Estructura de la aplicación
La estructura de la aplicación está dividida en 2 partes.

###Backend
El backend consiste en una API de tipo REST implementada usando el lenguaje Javascript bajo la plataforma Node.JS y apoyandose sobre el framework Express para la capa REST, Sequelize como ORM y SQLite3 como motor de persistencia de datos. Dicha API está dividida en varios módulos utilizando el mecanismo "routing modular" e implementa una autentificación de tipo JSON Web Token para los usuarios. 

###Frontend
El frontend está formado por 2 aplicaciones distintas, una aplicación de tipo MVC implementada usando el lenguaje Javascript junto con el framework AngularJS y los lenguajes HTML y CSS, apoyados con la libreria Bootstrap, para el diseño de las plantillas que forman las vistas de la aplicación. La otra es una mini aplicación simple que no utiliza ningún tipo de framework MVC y que solo tiene una pequeña interfaz diseñada en HTML+CSS+Bootstrap y que permite registrar nuevos usuarios de forma dinámica usando la tecnología AJAX mediante la libreria JQuery.

##Modelo de datos
El modelo de datos consiste en 3 entidades distintas interrelacionadas.

------ AQUI FALTAN COSAS!!!!!

##Seguridad 
