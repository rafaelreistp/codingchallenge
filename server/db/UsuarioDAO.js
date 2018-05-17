function UsuarioDAO(connection){
    this._connection = connection;
}

UsuarioDAO.prototype.busca = function(callback){
    this._connection.query('SELECT * from usuario', callback);
}

UsuarioDAO.prototype.buscaPorId = function(id, callback){
    this._connection.query('SELECT * from usuario WHERE id = ?', [id], callback);
}

UsuarioDAO.prototype.buscaPorEmail = function(email, callback){
    this._connection.query('SELECT * from usuario WHERE email = ?', [email], callback);
}

UsuarioDAO.prototype.insere = function(usuario, callback){
    this._connection.query('INSERT INTO usuario SET ?', usuario, callback);
}

UsuarioDAO.prototype.atualiza = function(usuario, callback){
    this._connection.query('UPDATE usuario SET nome = ?, senha = ?, email = ?, permissao = ? WHERE id = ?', [ usuario.nome, usuario.senha, usuario.email, usuario.permissao ,usuario.id ], callback);
}

UsuarioDAO.prototype.deleta = function(id, callback){
    this._connection.query('DELETE from usuario WHERE id = ?', [id], callback);
}

module.exports = function(){
    return UsuarioDAO;
}