module.exports = function(app){

    app.post('/resposta', (req, res) => {
        let resposta = req.body;
        resposta.id_usuario = req.userId;

        let connection = app.db.connectionFactory();
        let respostaDAO = new app.db.RespostaDAO(connection);
        respostaDAO.insere(resposta, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            else {
                resposta.id = results.insertId;
                console.log('Resposta de id ' + resposta.id + ' criado!');
                return res.status(201).send('Resposta de id ' + resposta.id + ' criado!');;
            }
        });
    });

    app.get('/resposta', (req, res) => {
        let connection = app.db.connectionFactory();
        let respostaDao = new app.db.RespostaDAO(connection);

        respostaDao.buscaSumarizada( (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).send(err);
            } else{
                return res.status(200).json(results);
            }
        });
    })

    app.get('/resposta/:id', (req, res) => {
        let connection = app.db.connectionFactory();
        let respostaDao = new app.db.RespostaDAO(connection);
        let questionarioId = req.params.id;

        respostaDao.buscaSumarizadaPorQuestionario(questionarioId, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).send(err);
            } else{
                return res.status(200).json(results);
            }
        })
    });

    app.get('/resposta/:questionarioId/:usuarioId', (req, res) => {
        let connection = app.db.connectionFactory();
        let respostaDAO = new app.db.RespostaDAO(connection);
        let questionarioId = req.params.questionarioId;
        let usuarioId = req.params.usuarioId;

        respostaDAO.buscaPorQuestionarioUsuario(questionarioId, usuarioId, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).send(err);
            } else{
                return res.status(200).json(results);
            }
        })
    })

}