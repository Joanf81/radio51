#Radio51 Web Application

##Introduction
This is a little application created in a university practice, it consists in a mini social network for musicians. This application allows you to registrate as an music artist and post songs, in the other hand, it allows non registered users to view the profile os the artists, songs posted by registered artists and write coments in songs and profiles of the artists

A combination of a varius tecnologies and languajes, that will be detailed in the next lines, has been used for developing this application. It's important to specify that one of the golas of the parctice is to use the Javascript lenguaje both in the frontside and in the backside

##Application's Skeleton
The application's skeleton is divided in 2 parts.

###Backend
Backend consists in a REST API (using JSON for data exchange) implemented using Javascript languaje and the Node.JS platform, it uses too Express as a REST framework, Sequelize as ORM and SQLite3 as data persistence engine. This API is divided in various modules using the "routing modular" mechanism and implements a JSON Web Token authentification for the users.

###Frontend
Frontend id formed by 2 differents applications, one of them is a MVC application implemented using the Javascript languaje and the AngularJS MVC framework, it has been used too the HTML and CSS languajes with the Bootstrap library for designing the angular templates that forms the application view. The other application that formas the frontend is a simply API that no uses any MVC framework, it has only a little interface designed using HTML+CSS+Bootstrap that allows dinamically register new users in the system, using the AJAX tecnology through the JQuery library.

##Data Model
The data model consists in 3 different entities (Artist, Song and Coment) with the next relationship:
 * An Artist can have (0, N) songs.  
 * A Song must belong to a single Artist 
 * An Artist can have (0, N) coments
 * A Song can hace (0, N) coments
 * A coment must belong to a single Song or an a single Artist, but it can't belong to and Artist and a Song at the same time.

##Authentification System
In the authentification and the user session system of the application, it has been used a Token based authentification system, concretly the JSON Web Token (JWT) standatd.

##Application deployment
For the correct deployment of the application, the next dependecies will be necesary: Node, npm, git, bower.

###Installing the dependencies on Ubuntu Linux
To install the dependecies form the Ubuntu repository you can use the next commands:

 `$sudo apt-get install curl #if curl is not installed`  
 `$curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -`  
 `$sudo apt-get install -y nodejs #install node and npm`  
 `$sudo apt-get install git #install git`  
 `$npm install -g bower #install bower`  

###Installing the extern libraries in Linux
This application uses, both in the backend and in frontend, various extern dependecies and libraries. Each part os the application uses a different dependecy manager, npm in the Node backend and bower in the Angular fronted, so before launching the application is essential to install such libraries and dependecies executing the next commands from the root directory of the project:

 `$npm install`  
 `$cd public`  
 `$bower install`  

###Application launching
When all the platforms, dependecies and libraries are installed, we can deploy the application using this command from the root directory of the project:

 `$node index`  

Then, we can acces the two applications using our web navigator, through the next URLs:

 `http://localhost:8080/# --> Angular aplication`  
 `http://localhost:8080/no-angular/index --> No MVC Framework Aplication`  


##Application tested in...
This application has been correctly tested in the next system:  
 `Ubuntu Linux 14.04.4 LTS`  
  
Using the next versions of the dependecies:  
 `Node v7.4.2`  
 `npm v2.15.11`  
 `git v1.9.1`  
 `bower v1.8.0`  
 
 The application's interface has been tested correctly in the next web browser:
  `Mozilla Firefox v46.0 for Ubuntu`  
  
##Used tecnologies

Javascript http://www.w3schools.com/js/  
HTML http://www.w3schools.com/html/  
CSS3 http://www.w3schools.com/css/css3_intro.asp  
SQL http://www.w3schools.com/sql/sql_intro.asp  
JSON http://www.w3schools.com/js/js_json_intro.asp  
  
REST https://www.w3.org/2001/sw/wiki/REST  
Model–view–controller (MVC) https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller  
Javascript Web Token (JWT) https://jwt.io/  
AJAX http://www.w3schools.com/xml/ajax_intro.asp  
  
Node.JS https://nodejs.org/  
Express http://expressjs.com/  
Sequelize http://docs.sequelizejs.com/en/v3/  
AngularJS https://angularjs.org/  
JQuery https://jquery.com/  
Bootstrap http://getbootstrap.com/  
  
SQLite3 https://sqlite.org/  
  
npm https://www.npmjs.com/  
bower https://bower.io/  
  
Mozilla firefox https://www.mozilla.org/en-GB/firefox/new/  
  
##Author
Application completly developed by Joan Fernández Bornay.
