var app = require('./config/express.js')();

app.listen(8080, 'localhost', () => {
    console.log('Servidor rodando!');
});