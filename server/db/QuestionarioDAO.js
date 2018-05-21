function QuestionarioDAO(connection){
    this._connection = connection;
}

QuestionarioDAO.prototype.busca = function(callback){
    this._connection.query("SELECT questionario.id, questionario.qr_code, questionario.nome,  usuario.nome AS nome_usuario, CASE WHEN questionario.categoria = 1 THEN 'Tecnologia' ELSE 'Negócios' END AS categoria from questionario join usuario on questionario.id_usuario = usuario.id", callback);
}

QuestionarioDAO.prototype.buscaPorId = function(id, callback){
    this._connection.query('SELECT * from questionario WHERE id = ?', [id], callback);
}

QuestionarioDAO.prototype.insere = function(questionario, callback){
    this._connection.query('INSERT INTO questionario SET ?', questionario, callback);
}

QuestionarioDAO.prototype.atualiza = function(questionario, callback){
    this._connection.query('UPDATE questionario SET nome = ?, categoria = ? WHERE id = ?', [ questionario.nome, questionario.categoria, questionario.id ], callback);
}

QuestionarioDAO.prototype.deleta = function(id, callback){
    this._connection.query('DELETE from questionario WHERE id = ?', [id], callback);
}

module.exports = function(){
    return QuestionarioDAO;
}