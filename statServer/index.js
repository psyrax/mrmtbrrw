const express = require('express');
const cors = require('cors')
const app = express();

const statExport = require(__dirname +'/../modules/stats.js');

app.use(cors());

app.get('/gpu', function (req, res) {
	var getGpuStats = statExport.printGpuHistoricData();
	res.json(getGpuStats)
});

var server = app.listen(3000, function () {
  console.log('Stat server running on port 3000!')
});


const io = require('socket.io')(server, { origins: '*:*'});


io.on('connection', function (socket) {
	statExport.suscribe.on('gpuStats', function(stats){
		socket.emit('stats',stats);
	});
});
