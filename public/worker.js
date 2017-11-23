self.onmessage = (workerRequest) => {
	console.log('worker request: ', workerRequest);
	const workerResponse = {
		code: '0',
		message: 'Hello world',
		data: 15,
	};
	self.postMessage(workerResponse);
};

