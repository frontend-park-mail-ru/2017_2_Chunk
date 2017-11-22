onmessage = (workerRequest) => {
	debugger;
	console.log('worker request: ', workerRequest);
	const workerResponse = 'Worker response';
	postMessage(workerResponse);
};

console.log('worker');