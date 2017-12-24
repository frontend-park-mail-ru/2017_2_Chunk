let connected = false;
var peers = [];
self.addEventListener('connect', (event) => {
	let currentPort = event.ports[0];
	currentPort.onmessage = (eventPort) => {
		if (eventPort.data === "start") {
			if (connected === false) {
				currentPort.postMessage('firstWorker');
				connected = true;
				peers.push(currentPort);
			} else {
				peers.push(currentPort);
				peers.forEach(function (port) {
					if (port !== currentPort)
						port.postMessage('setPause');

				});
				currentPort.postMessage('setPlay');
			}
		}
		else if (eventPort.data === 'playPageActive') {
			peers.forEach(function (port) {
				if (port !== currentPort)
					port.postMessage('setPause');
			});
			currentPort.postMessage('setPlay');
		}
	};
});