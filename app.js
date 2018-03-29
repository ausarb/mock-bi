var rabbit = require('rabbit.js');
var config = {
	rabbit: "amqp://rabbit:5672",
	topics: {
		in: "transcript",
		out: null
	}
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
			var bufCall = sub.read();
			if (bufCall) {
				var call = JSON.parse(bufCall.toString());
				console.log("mock-bi got " + call.transcript);
				setTimeout(function () {
					sub.ack();
				}, readSpeed);
			}
		});
		sub.connect(config.topics.in, function() {
			console.log('mock-bi connected to: '+config.topics.in);
		});
	})
	.on('error', function(error) {
		console.log(error);
	})
;