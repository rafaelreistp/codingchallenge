var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

module.exports = function(app) {
    
    app.post('/register', (req, res) => {
        let usuario = req.body;
        let connection = app.db.connectionFactory();
        let usuarioDAO = new app.db.UsuarioDAO(connection);

        bcrypt.hash(usuario.senha, 8, (err, hash) => {
            if(err){
                console.log(err);
                return res.status(500).send(err);
            }else{
                usuario.senha = hash;
                usuario.permissao = 2;
                usuarioDAO.insere(usuario, (err, result) => {
                    if(err){
                        console.log(err);
                        res.status(500).send(err);
                        return;
                    } else{
                        usuario.id = result.insertId;
                        console.log('Usuário criado com sucesso!');
                        let token = jwt.sign({id: usuario.id}, app.secret, { expiresIn: 86400 });
                        res.status(200).send({ auth: true, token: token });
                    }
                });
            }
        });
       
    });

    app.post('/login', (req, res) => {
        let connection = app.db.connectionFactory();
        let usuarioDAO = new app.db.UsuarioDAO(connection);
        let usuario = req.body

        usuarioDAO.buscaPorEmail(usuario.email, (err, results) => {
            if (err){
                console.log(err);
                return res.status(500).send(err);
            } else if(results.length == 0){
                console.log('Usuário não encontrado!');
                return res.status(404).send('Usuário não encontrado!');
            } else{
                console.log(results[0].senha);
                console.log(usuario.senha);
                bcrypt.compare(usuario.senha, results[0].senha, (err, valid) => {
                    if(err){
                        console.log(err);
                        return res.status(500).send(err);
                    }else{
                        if(valid){
                            let token = jwt.sign( { id: results[0].id }, app.secret, { expiresIn: 86400 } );
                            res.status(200).send({ auth: true, token: token })
                        }else{
                            console.log("Senha incorreta!");
                            return res.status(401).send({ auth: false, token: null });
                        }
                    }
                });
            }
        });
    });

    app.use('/*', function verifyToken(req, res, next){
        let connection = app.db.connectionFactory();
        let usuarioDAO = new app.db.UsuarioDAO(connection);
        let token = req.headers['x-access-token'];
        if (!token){
            return res.status(403).send({ auth: false, message: 'Nenhum token fornecido.' });
        } else{
            jwt.verify(token, app.secret, (err, decoded) => {
                if(err){
                    console.log(err);
                    return res.status(500).send({ auth: false, message: 'Falha ao autenticar token.' });
                } else{
                    req.userId = decoded.id;
                    usuarioDAO.buscaPorId( req.userId, (err, results) => {
                        if(err){
                            console.log(err);
                            return res.status(500).send(err);
                        }else {
                            req.userPermission = results[0].permissao;
                        }
                        next();
                     });
                }
            });
        }
    });

    app.get('/me', (req, res) => {
        let connection = app.db.connectionFactory();
        let usuarioDAO = new app.db.UsuarioDAO(connection);
        usuarioDAO.buscaPorId( req.userId, (err, results) => {
           res.send(results[0]); 
        });
      });
}