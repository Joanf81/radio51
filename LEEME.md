#Radio51 Web Application

##Introducción
Esta es una pequeña aplicación web creada para una práctica de la universiadad, que consiste en una mini red social enfocada a artistas músicales. Esta aplicación permite registrarse como artista y publicar canciones, por otra parte, permite a los usuarios no registrados ver el perfil de los artistas, sus canciones, y escribir comentarios tanto en los perfiles de dichos artistas como en sus canciones.

Para el desarrollo de la aplicación se ha usado una combinación de varias tecnologías y lenguajes que se detallaran mas adelante, aunque es importante concretar que uno de los objetivos de la práctica era usar Javascript como lenguaje de programación tanto en el frontside como en el backside.

##Estructura de la aplicación
La estructura de la aplicación está dividida en 2 partes.

###Backend
El backend consiste en una API de tipo REST (usando JSON para el intercambio de datos) implementada usando el lenguaje Javascript bajo la plataforma Node.JS y apoyandose sobre el framework Express para la capa REST, Sequelize como ORM y SQLite3 como motor de persistencia de datos. Dicha API está dividida en varios módulos utilizando el mecanismo "routing modular" e implementa una autentificación de tipo JSON Web Token para los usuarios. 

###Frontend
El frontend está formado por 2 aplicaciones distintas, una aplicación de tipo MVC implementada usando el lenguaje Javascript junto con el framework AngularJS y los lenguajes HTML y CSS, apoyados con la libreria Bootstrap, para el diseño de las plantillas que forman las vistas de la aplicación. La otra es una mini aplicación simple que no utiliza ningún tipo de framework MVC y que solo tiene una pequeña interfaz diseñada en HTML+CSS+Bootstrap y que permite registrar nuevos usuarios de forma dinámica usando la tecnología AJAX mediante la libreria JQuery.

##Modelo de datos
El modelo de datos consiste en 3 entidades distintas interrelacionadas.

##Sistema de autentificación
Para la autenticación y el mantenimiento de las sesiones de los usuarios de la aplicación se ha usado un sistema de autentificación basado en Tokens, concretamente el estándar JSON Web Token (JWT).

##Despliegue de la aplicación
Para el correcto despliegue de la aplicación son necesarias las siguientes dependecias: Node, npm, git, bower.

###Instalación de las dependecias en Ubuntu Linux
Para instalar las dependecias desde el repositorio de Ubuntu puedes usar los siguientes comandos:  

 `$sudo apt-get install curl #if curl is not installed`  
 `$curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -`  
 `$sudo apt-get install -y nodejs #install node and npm`  
 `$sudo apt-get install git #install git`  
 `$npm install -g bower #install bower`  

###Instalación de las librerias externas necesarias en Linux
Esta aplicación usa, tanto en el backend como en el frontend, varias dependencias y librerias externas. Cada parte de la aplicación utiliza un gestor de dependencias distinto, npm para el backend en Node y bower para el frontend en Angular, por lo que antes de lanzar la aplicación es imprescindible instalar dichas librerias y dependecias ejecutando los siguientes comandos desde el directorio raiz del proyecto:

 `$npm install`  
 `$cd public`  
 `$bower install`  

###Lanzamiento de la aplicación
Una vez instaladas todas las plataformas, dependencias y librerias externas ya podemos desplegar completamente la aplicación mediante el siguiente comando:

 `$node index`  

y podremos acceder a las 2 aplicaciones diferentes integradas en el frontend mediante nuestro navegador web, a traves de las siguientes URLs:

 `http://localhost:8080/# --> Angular aplication`  
 `http://localhost:8080/no-angular/index --> No MVC Framework Aplication`  

##Aplicación probada en...
