var rabbit = require('rabbit.js');
var config = {
	rabbit: "amqp://172.17.0.3",
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
			var bufTranscript = sub.read();
			if (bufTranscript) {
				var transcript = JSON.parse(bufTranscript.toString());
				console.log("mock-bi got " + transcript.text);
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