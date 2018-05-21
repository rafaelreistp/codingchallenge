module.exports = function(app){
    app.post('/pergunta/', function(req,res){
        let pergunta = req.body;

        let connection = app.db.connectionFactory();
        let perguntaDAO = new app.db.PerguntaDAO(connection);
        perguntaDAO.insere(pergunta, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);;
            }
            else {
                pergunta.id = results.insertId;
                console.log('Pergunta de id ' + pergunta.id + ' criada!');
                return res.status(201).send({id: pergunta.id});
            }
        });
    });

    app.get('/pergunta/', (req,res) => {
        let connection = app.db.connectionFactory();
        let perguntaDAO = new app.db.PerguntaDAO(connection);

        perguntaDAO.busca( (err, results) => {

            if(err){
                console.log(err);
                return res.status(500).send(err);
            } else{
                return res.status(200).json(results);
            }

        });
    });

    app.get('/pergunta/q/:id', (req, res) => {
        let connection = app.db.connectionFactory();
        let perguntaDAO = new app.db.PerguntaDAO(connection);
        let id = req.params.id;

        perguntaDAO.buscaPorQuestionario(id, (err, results) => {
            if(results.length == 0){
                return res.status(204).send('Nenhuma pergunta encontrada.');
            }
            else if (err){
                console.log(err);
                return res.status(500).send(err);
            }
            else{
                return res.status(200).json(results);
            }
        });
    });

    app.get('/pergunta/:id', (req, res) => {
        let connection = app.db.connectionFactory();
        let perguntaDAO = new app.db.PerguntaDAO(connection);
        let id = req.params.id;

        perguntaDAO.buscaPorId(id, (err, results) => {
            if(results.length == 0){
                return res.status(204).send('Nenhuma pergunta encontrada.');
            }
            else if (err){
                console.log(err);
                return res.status(500).send(err);
            }
            else{
                return res.status(200).json(results);
            }
        });
    });

    app.put('/pergunta/:id', (req, res) => {
        let pergunta = req.body;
       
       pergunta.id = req.params.id;
       let connection = app.db.connectionFactory();
       let perguntaDAO = new app.db.PerguntaDAO(connection);
       perguntaDAO.atualiza(pergunta, (err, results) => {
           if (err) {
               console.log(err);
               return res.status(500).send(err);;
           }
           else {
               console.log('Pergunta de id ' + pergunta.id + ' atualizada!');
               return res.status(200).send(results);
           }
       });
   });

   app.delete('/pergunta/:id', (req, res) => {
    let connection = app.db.connectionFactory();
    let perguntaDAO = new app.db.PerguntaDAO(connection);
    let id = req.params.id;

    perguntaDAO.deleta(id, (err, results) => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        } else{
            console.log('Pergunta de id ' + id + ' deletada!');
            return res.status(200).send(results);
        }
    });
});


}
  