var supertest = require('supertest');

var server = supertest.agent("http://localhost:3000");

describe('Se puede obtener un listado paginado de todos los artistas en el sistema (CASO 4)', function(){
    it('Se devuelve el artista contenido en formato json ', function(done) {
         server
            .get('/artista/pagina/1')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });

});