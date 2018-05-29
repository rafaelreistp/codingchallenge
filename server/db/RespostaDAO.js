function RespostaDAO(connection){
    this._connection = connection;
}

RespostaDAO.prototype.busca = function(callback){
    this._connection.query('SELECT resposta.*, usuario.nome as nome_usuario from resposta join usuario on resposta.id_usuario = usuario.id', callback);
}

RespostaDAO.prototype.buscaPorId = function(id, callback){
    this._connection.query('SELECT * from resposta WHERE id = ?', [id], callback);
}

RespostaDAO.prototype.insere = function(respostas, callback){
    this._connection.query('REPLACE INTO resposta (resposta, id_pergunta, id_usuario) VALUES ?', [respostas], callback);
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

RespostaDAO.prototype.buscaPorQuestionarioUsuario = function(questionarioId, usuarioId, callback){
    this._connection.query('SELECT * from resposta r join ( SELECT pergunta.* FROM pergunta JOIN questionario on pergunta.id_questionario = questionario.id WHERE questionario.id = ? ) p on r.id_pergunta = p.id WHERE r.id_usuario = ?', [questionarioId, usuarioId], callback);
}

RespostaDAO.prototype.buscaSumarizada = function(callback){
    this._connection.query('SELECT u.nome as nome_usuario, K.* FROM usuario u JOIN (SELECT J.*,q.nome as nome_questionario FROM questionario q JOIN (SELECT distinct r.id_usuario, p.id_questionario FROM resposta r join pergunta p on r.id_pergunta = p.id) J on q.id = J.id_questionario) K on u.id = K.id_usuario', callback);
}

RespostaDAO.prototype.buscaSumarizadaPorQuestionario = function(questionarioId, callback){
    this._connection.query('SELECT u.nome as nome_usuario, K.* FROM usuario u JOIN (SELECT J.*,q.nome as nome_questionario FROM questionario q JOIN (SELECT distinct r.id_usuario, p.id_questionario FROM resposta r join pergunta p on r.id_pergunta = p.id) J on q.id = J.id_questionario) K on u.id = K.id_usuario WHERE id_questionario = ?', [questionarioId] , callback);
}

RespostaDAO.prototype.buscaSumarizadaPorUsuario = function(usuarioId, callback){
    this._connection.query('SELECT u.nome as nome_usuario, K.* FROM usuario u JOIN (SELECT J.*,q.nome as nome_questionario FROM questionario q JOIN (SELECT distinct r.id_usuario, p.id_questionario FROM resposta r join pergunta p on r.id_pergunta = p.id) J on q.id = J.id_questionario) K on u.id = K.id_usuario WHERE id_usuario = ?', [usuarioId] , callback);
}

module.exports = function(){
    return RespostaDAO;
}