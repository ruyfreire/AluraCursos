let fs = require('fs');

fs.readFile('img.png', function(erro, buffer){
    console.log('lendo arquivo');

    fs.writeFile('img-readFile.png', buffer, function(err){
        console.log('arquivo escrito');
    });
});