
var supertest = require('supertest');

var server = supertest.agent("http://localhost:3000");

describe('Prueba logueo de un artista (CASO 2)', function(){
    it('Devuelve estado 200 y un JWT si el usuario y pass son correctos', function(done){
        server
            .post('/autentificacion')
            .send({nombre_artistico: "The Doors", pass: "The Doors"})
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
    it('Devuelve 400 si el usuario y pass no son correctos', function(done){
        server
            .post('/autentificacion')
            .send({nombre_artistico: "The Doors", pass: "fsegsgdgerg"})
            .expect('Usuario o contraseña incorrectos.')
            .expect(400, done)
    });
});