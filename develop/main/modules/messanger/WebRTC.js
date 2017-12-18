'use strict';
import eventBus from '../eventBus';


class WebRTC {
	constructor() {
		this.iceServers = [{url: 'stun:stun.l.google.com:19302'}];
		this.isInitiator = false;
	}


	init (socket, peerUser, isInitiator) {
		this.peerHandlers = {
			'icecandidate': this.onLocalIceCandidate,
			'iceconnectiononstatechange': this.onIceConnectionStateChange,
			'datachannel': this.onDataChannel,
		};
		this.connect();
	}


	connect() {
		this.peerConnection = new RTCPeerConnection({iceServers: this.iceServers});
		Events.listen(this.peerConnection, this.peerHandlers, this);

		if (this.isInitiator) {
			try {
				this.setLocalDescriptionAndSend();
			}
			catch (err) {
				console.log('error WebRTC comnnection', err);
			}
		}
	}


	async setLocalDescriptionAndSend() {
		const localDescription = await this.getDescription();
		const response = await this.peerConnection.setLocalDescription(localDescription);
		console.log('Sending SDP', 'green');
		this.sendSdp(this.peerUser.userID, localDescription);
	}

	getDescription() {
		if (this.isInitiator)
			return this.peerConnection.createOffer();
		return this.peerConnection.createAnswer();
	}

	async setSdp(sdp) {
		const rsd = new RTCSessionDescription(sdp);
		const result = await this.peerConnection.setRemoteDesctiption(rsd);
		this.remoteDescriptionReady = true;
		console.log('Got SDP from remote peer', 'green');
		while (this.pendingCandidates.length) {
			this.addRemoteCandidate(this.pendingCandidates.pop())
		}
		if (!this.isInitiator)
			this.setLocalDescriptionAndSend();
	}


	onLocalIceCandidate(event) {
		if (event.candidate) {
			console.log('Send my ICE-candidate: ' + event.candidate.candidate, 'gray');
			this.sendIceCandidate(this.peerUser.userID, event.candidate)
		}
		else {
			console.log('No more candidates', 'gray');
		}
	}


	addRemoteCandidate(candidate) {
		this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
		console.log('Added his ICE-candidate:' + candidate.candidate, 'gray');
	}
}