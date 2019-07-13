const cluster = require('cluster');
const os = require('os');

const cpus = os.cpus();

console.log('Executando thread');

if(cluster.isMaster) {
    console.log('Thread master');
    
    cpus.forEach(function(){
        cluster.fork();
    });

    cluster.on('listening', worker => console.log('Thread conectada: '+ worker.process.pid) );

    cluster.on('exit', worker => {
        console.log('Thread %d desconectada', worker.process.pid);
        cluster.fork();
    });
}
else {
    console.log('Thread Slave');
    require('./index');
}