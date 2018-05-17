module.exports = function(app){
    app.post('/questionario/', (req, res) => {
        let questionario = req.body;
        questionario.id_usuario = req.userId;

        let connection = app.db.connectionFactory();
        let questionarioDAO = new app.db.QuestionarioDAO(connection);
        questionarioDAO.insere(questionario, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);;
            }
            else {
                questionario.id = result.insertId;
                console.log('Questionario de id ' + questionario.id + ' criado!');
                return res.status(201).send('Questionario de id ' + questionario.id + ' criado!');;
            }
        });
    });

    app.get('/questionario/', (req,res) => {
        let connection = app.db.connectionFactory();
        let questionarioDAO = new app.db.QuestionarioDAO(connection);

        questionarioDAO.busca( (err, results) => {

            if(err){
                console.log(err);
                return res.status(500).send(err);;
            } else{
                return res.status(200).json(results);;
            }

        });
    });

    app.get('/questionario/:id', (req, res) => {
        let connection = app.db.connectionFactory();
        let questionarioDAO = new app.db.QuestionarioDAO(connection);
        let id = req.params.id;

        questionarioDAO.buscaPorId(id, (err, results) => {
            if(results.length == 0){
                return res.status(204).send('Questionário não encontrado.');;
            }
            else if (err){
                console.log(err);
                return res.status(500).send(err);;
            }
            else{
                return res.status(200).json(results);;
            }
        });
    });

    app.put('/questionario/:id', (req, res) => {
         let questionario = req.body;
        
        questionario.id = req.params.id;
        let connection = app.db.connectionFactory();
        let questionarioDAO = new app.db.QuestionarioDAO(connection);
        questionarioDAO.atualiza(questionario, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            else {
                console.log('Questionario de id ' + questionario.id + ' atualizado!');
                return res.status(200).send('Questionario de id ' + questionario.id + ' atualizado!');
            }
        });
    });

    app.delete('/questionario/:id', (req, res) => {
        let connection = app.db.connectionFactory();
        let questionarioDAO = new app.db.QuestionarioDAO(connection);
        let id = req.params.id;

        questionarioDAO.deleta(id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).send(err);;
            } else{
                console.log('Questionaro de id ' + id + ' deletado!');
                return res.status(200).send('Questionaro de id ' + id + ' deletado!');
            }
        });
    });

}
  