module.exports = function(app){

    app.post('/resposta', (req, res) => {
        let body = req.body;
        let respostas = [];
        
        for(let property in body){
            respostas.push([body[property],property,req.userId ])
        }

        let connection = app.db.connectionFactory();
        let respostaDAO = new app.db.RespostaDAO(connection);
        respostaDAO.insere(respostas, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            else {
                return res.status(201).json(results);
            }
        });
        connection.end();
    });

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

    app.get('/resposta/', (req, res) => {
        let connection = app.db.connectionFactory();
        let respostaDao = new app.db.RespostaDAO(connection);
        let usuarioId = req.userId;

        respostaDao.buscaSumarizadaPorUsuario(usuarioId, (err, results) => {
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