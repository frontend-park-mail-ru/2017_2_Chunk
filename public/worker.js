onmessage = (workerRequest) => {
	debugger;
	console.log('worker request: ', workerRequest);
	const workerResponse = {
		code: '0',
		message: 'Hello world',
		data: 15,
	};
	postMessage(workerResponse);
};

console.log('worker');