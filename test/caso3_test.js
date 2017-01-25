var supertest = require('supertest');

var server = supertest.agent("http://localhost:3000");

describe('Se puede obtener los datos de un artista a traves de su id (CASO 3)', function(){
    it('Se devuelve el artista contenido en formato json ', function(done) {
         server
            .get('/artista/1')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });

});