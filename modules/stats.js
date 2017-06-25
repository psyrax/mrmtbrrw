const Tail = require('tail').Tail;
const gpuTail = new Tail(__dirname + '/../logs/gpuStats.csv');
const EventEmitter = require('events');

class StatsEmitter extends EventEmitter {}
const statsEmitter = new StatsEmitter();

let gpuHistoricData = [];

gpuTail.on("line", function(data) {
	var gpuData = data.replace('\r','').split(', ');
	var gpuObj = {
		usage: gpuData[0],
		ramUsage: gpuData[1],
		totalRam: gpuData[2],
		freeRam: gpuData[3],
		usedRam: gpuData[4],
		usedPower: gpuData[5],
		temp: gpuData[6],
		name: gpuData[7],
		date: new Date()
	};
	gpuHistoricData.push(gpuObj);
	statsEmitter.emit('gpuStats', gpuObj);
});

var exports = module.exports = {};

exports.printGpuHistoricData = function(){
	return gpuHistoricData.reverse();
}
exports.suscribe = statsEmitter;