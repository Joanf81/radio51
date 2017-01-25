
var supertest = require('supertest');

var server = supertest.agent("http://localhost:3000");

describe('Prueba creación de un artista (CASO 1)', function(){
    it('Devuelve estado 201 si todo esta correcto', function(done){
        server
            .post('/artista')
            .send({nombre_artistico: "joan", pass: "pass"})
            .expect(201, done)
    });
    it('Devuelve 400 si no se especifica nombre_artisitco', function(done){
        server
            .post('/artista')
            .send({nombre: "joan", pass: "pass"})
            .expect(400, done)
    });
    it('Devuelve 400 si no se especifica pass', function(done){
        server
            .post('/artista')
            .send({nombre: "joan"})
            .expect(400, done)
    });
    it('El artista joan se ha creado correctamente', function(done) {
         server
            .get('/artista/3')
            .expect('Content-Type', /json/)
            .expect(200, done)  
    });

});