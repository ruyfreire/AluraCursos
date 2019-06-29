let fs = require('fs');


module.exports = (app) => {

    app.post('/upload/imagem', function(req, res){
        console.log('recebendo imagem');

        let filename = req.headers.filename;

        req.pipe(fs.createWriteStream('uploads/' + filename))
            .on('finish', function(erro){
                console.log('imagem recebida');
                res.status(201).send('Imagem enviada');
            });
    });
}