var rabbit = require('rabbit.js');
var config = {
	rabbit: "amqp://rabbit:rabbit-amqp",
	topics: {
		in: "transcript",
		out: null
	}
};

var context = rabbit.createContext(config.rabbit)
	.on('ready', function() {
		console.log('context ready');
		var sub = this.socket('WORKER', {
			prefetch: 300 // prefetch of 0 infinite.  RabbitMQ recommends a range of 100 - 300 to start with.
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
					//should do something with the transcript like store it.
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