let connected = false;
let currentPort1 = undefined;
let currentPort2 = undefined;
var peers = [];
self.addEventListener('connect', (event) => {
	let currentPort = event.ports[0];
	currentPort.onmessage = (eventPort) => {
		if (eventPort.data === "start") {
			if (connected === false) {
				currentPort.postMessage('worker init');
				connected = true;
				currentPort1 = Object.assign({}, currentPort);
				peers.push(currentPort);
			} else {
				// ports.forEach((port) => {
				// 	console.log(port);
				peers.push(currentPort);
				currentPort.postMessage(currentPort1);
				// });
				peers.forEach(function (port) {
					port.postMessage('next worker create!');
				});
			}
			// currentPort.postMessage('worker already inited');
		}
	};
})