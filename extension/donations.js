'use strict';
const EventEmitter = require("events");
const io = require("socket.io-client");
const clone = require('clone');

const nodecg = require('./util/nodecg-api-context').get();
const recentDonations = nodecg.Replicant('recentDonations');

let opts = {
	reconnect: true
};

// Apply options to defaults if they exist
if(typeof nodecg.bundleConfig.socketio === "object") {
	for(let i in nodecg.bundleConfig.socketio) {
		opts[i] = nodecg.bundleConfig.socketio[i];
	}
}

let socket = io.connect(`https://sockets.streamlabs.com/?token=${nodecg.bundleConfig.socket_token}`, opts);
let emitter = new EventEmitter();

socket.on("event", event => {
	console.log("received event from streamlabs: ");
	console.log(event);

    // No message? Must be an error, so we skip it because we already do raw emits.	
	if(!(event.message instanceof Object)) {
		nodecg.log.error(`Event ${event.event_id} had no ites in its event.message property, skipping.`);
	}
		
	if (event.type == "donation" && event.message.length >= 1) {
		let message = {
			id: event.message[0].id || event.message[0]._id || null,
			name: event.message[0].name,
			amount: {
				amount: event.message[0].amount,
				currency: event.message[0].currency
			},
			formatted_amount: event.message[0].formatted_ammount,
			message: event.message[0].message
		};
		nodecg.sendMessage("donation", message);
		emitter.emit("donation", message);

		console.log("recentDonationslength: " + recentDonations.value.length);
		if (recentDonations.value.length > 0)
		{
			var top;
			if (recentDonations.value.length >= 10) 
				top = 8;
			else
				top = recentDonations.value.length - 1;
			
			for(var i = top; i >= 0; i--)
			{
				recentDonations.value[i + 1] = clone(recentDonations.value[i]);
			}
		}
		recentDonations.value[0] = clone(message);
		console.log(recentDonations.value);
	}
});

/*
streamlabs.on('twitch-event', event => {
    // do work
	console.log("I have received a notification from streamlabs here it is oh boy");
	if (event.type == 'donation')
	{
		console.log("donation!");
		if (recentDonations.value.length > 1)
		{
			for(i = recentDonations.value.length -1; i--; i >= 0)
			{
				recentDonations.value[i + 1] = clone(recentDonations.value[i]);
			}
		}
		recentDonations.value[0] = clone(event.message);
		
		console.log(recentDonations.value);
	}
});
*/