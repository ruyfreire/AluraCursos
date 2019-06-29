let fs = require('fs');

fs.createReadStream('img.png')
    .pipe(fs.createWriteStream('img-streamFile.png'))
    .on('finish', function(){
        console.log('arquivo escrito');
    });