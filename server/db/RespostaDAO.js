function RespostaDAO(connection){
    this._connection = connection;
}

RespostaDAO.prototype.busca = function(callback){
    this._connection.query('SELECT * from resposta', callback);
}

RespostaDAO.prototype.buscaPorId = function(id, callback){
    this._connection.query('SELECT * from resposta WHERE id = ?', [id], callback);
}

RespostaDAO.prototype.insere = function(resposta, callback){
    this._connection.query('INSERT INTO resposta SET ?', resposta, callback);
}

RespostaDAO.prototype.atualiza = function(resposta, callback){
    this._connection.query('UPDATE resposta SET resposta = ? WHERE id = ?', [ resposta.resposta, resposta.id ], callback);
}

RespostaDAO.prototype.deleta = function(id, callback){
    this._connection.query('DELETE from resposta WHERE id = ?', [id], callback);
}

RespostaDAO.prototype.buscaPorUsuario = function(usuarioId, callback){
    this._connection.query('SELECT * from resposta WHERE id_usuario = ?', [usuarioId], callback);
}

RespostaDAO.prototype.buscaPorQuestionario = function(questionarioId, callback){
    this._connection.query('SELECT * from resposta r join ( SELECT pergunta.* FROM pergunta JOIN questionario on pergunta.id_questionario = questionario.id WHERE questionario.id = ? ) p on r.id_pergunta = p.id', [questionarioId], callback);
}

RespostaDAO.prototype.buscaPorQuestionarioUsuario = function(questionarioId, usuarioId, callback){
    this._connection.query('SELECT * from resposta r join ( SELECT pergunta.* FROM pergunta JOIN questionario on pergunta.id_questionario = questionario.id WHERE questionario.id = ? ) p on r.id_pergunta = p.id WHERE r.id_usuario = ?', [questionarioId, usuarioId], callback);
}

module.exports = function(){
    return RespostaDAO;
}