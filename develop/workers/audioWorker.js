let connected = false;
let currentPort1 = undefined;
let currentPort2 = undefined;
var peers = [];
self.addEventListener('connect', (event) => {
	let currentPort = event.ports[0];
	currentPort.onmessage = (eventPort) => {
		if (eventPort.data === "start") {
			if (connected === false) {
				currentPort.postMessage(2);
				connected = true;
				currentPort1 = Object.assign({}, currentPort);
				peers.push(currentPort);
			} else {
				peers.push(currentPort);
				// peers.forEach(function (port) {
				// 	port.postMessaggt e(port);
				// });
				peers.forEach(function (port) {
					if (port !== currentPort)
						port.postMessage('new worker');
				});
			}
		}
	};
})