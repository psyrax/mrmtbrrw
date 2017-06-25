jQuery(document).ready(function($){
	var socket = io('http://mrmtbrrw.oglabs.info/');
	socket.on('stats', function(statsData){
		console.log('Got stats from server',statsData);
		var stats = statsData;
		$('.gpuName').html(stats.name);
		$('.ramData').html(stats.usedRam);
		$('.tempData').html(stats.temp + 'c');
		$('.powerData').html(stats.usedPower);
	})
})