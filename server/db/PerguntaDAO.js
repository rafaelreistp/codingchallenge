function PerguntaDAO(connection){
    this._connection = connection;
}

PerguntaDAO.prototype.busca = function(callback){
    this._connection.query('SELECT * from pergunta', callback);
}

PerguntaDAO.prototype.buscaPorId = function(id, callback){
    this._connection.query('SELECT * from pergunta WHERE id = ?', [id], callback);
}

PerguntaDAO.prototype.buscaPorQuestionario = function(id, callback){
    this._connection.query('SELECT * from pergunta WHERE id_questionario = ?', [id], callback);
}

PerguntaDAO.prototype.insere = function(pergunta, callback){
    this._connection.query('INSERT INTO pergunta SET ?', pergunta, callback);
}

PerguntaDAO.prototype.atualiza = function(pergunta, callback){
    this._connection.query('UPDATE pergunta SET tipo = ?, pergunta = ? WHERE id = ?', [ pergunta.tipo, pergunta.pergunta ,pergunta.id ], callback);
}

PerguntaDAO.prototype.deleta = function(id, callback){
    this._connection.query('DELETE from pergunta WHERE id = ?', [id], callback);
}

module.exports = function(){
    return PerguntaDAO;
}