onmessage = (event) => {
    console.log('Message received in worker');
    postMessage(event.data);
};