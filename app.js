var rabbit = require('rabbit.js');
var config = {
	rabbit: "amqp://172.17.0.3",
	topic: "transcript"
};

var context = rabbit.createContext(config.rabbit)
	.on('ready', function() {
		console.log('context ready');
		var sub = this.socket('WORKER', {
			prefetch: 1
		});

		var readSpeed;
		function setReadspeed() {
			readSpeed = Math.round(10*Math.random())+1;
		}
		setReadspeed();
		setInterval(setReadspeed, 5000);

		sub.on('readable', function() {
			var event = sub.read();
			console.log("sub got " + event);
			setTimeout(function() {
				sub.ack();
			}, readSpeed);
		});
		sub.connect(config.topic, function() {
			console.log('subscriber connected to events');
		});
	})
	.on('error', function(error) {
		console.log(error);
	})
;