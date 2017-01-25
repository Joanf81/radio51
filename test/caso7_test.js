
var supertest = require('supertest');

var server = supertest.agent("http://localhost:3000");

describe('Prueba comentar una cancion (CASO 7)', function(){
    it('Devuelve estado 201 si todo esta correcto', function(done){
        server
            .post('/cancion/1/comentar')
            .send({autor: "joan", contenido: "blablabla"})
            .expect(201, done)
    });
    it('Devuelve 400 si no se especifica contenido', function(done){
        server
            .post('/cancion/1/comentar')
            .send({autor: "joan"})
            .expect(400, done)
    });
    it('El comentario se ha creado correctamente', function(done) {
         server
            .get('/comentario/5')
            .expect('Content-Type', /json/)
            .expect(200, done)  
    });

});

describe('Prueba comentar un artista (CASO 7)', function(){
    it('Devuelve estado 201 si todo esta correcto', function(done){
        server
            .post('/artista/1/comentar')
            .send({autor: "joan", contenido: "blablabla"})
            .expect(201, done)
    });
    it('Devuelve 400 si no se especifica contenido', function(done){
        server
            .post('/artista/1/comentar')
            .send({autor: "joan"})
            .expect(400, done)
    });
    it('El comentario se ha creado correctamente', function(done) {
         server
            .get('/comentario/6')
            .expect('Content-Type', /json/)
            .expect(200, done)  
    });

});