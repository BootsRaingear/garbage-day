const app = require('express')();
const EventEmitter = require("events");
const io = require("socket.io-client");

const clone = require('clone');

const nodecg = require('./util/nodecg-api-context').get();
const StreamLabs = require('streamlabs');
const streamlabs = new StreamLabs(
		nodecg.bundleConfig.streamlabs.clientId, 
		nodecg.bundleConfig.streamlabs.clientSecret, 
		nodecg.bundleConfig.streamlabs.redirectUrl, 
		"donations.read donations.create alerts.create socket.token"
);

const recentDonations = nodecg.Replicant('recentDonations');
const donationTotal = nodecg.Replicant('donationTotal');
const slTokens = nodecg.Replicant('slTokens');

const slAuthUrl = nodecg.Replicant('slAuthUrl')
slAuthUrl.value = streamlabs.authorizationUrl();

app.get('/connect', (req, res) => {
	streamlabs.connect(req.query.code)
		.then((result) => {
			res.json(result.data);
			slTokens.value.access_token = result.data.access_token;
			slTokens.value.refresh_token = result.data.refresh_token;
			slTokens.value.expires = Date.now() + result.data.expires_in * 1000;
		})
		.catch((err) => { 
			res.json(err.response.data);
		});
	//slTokens.value.access_token = result.access_token;
	//slTokens.value.expires = result.expires_in
});
app.listen(8080);

nodecg.listenFor('grabDonations', msg => {
	
	var access_token = 
	if (slTokens.value.expires < Date.now()) {
		streamlabs.reconnect(slTokens.value.refresh_token)
			.then((result) => {
				console.log(result.data);
				slTokens.value.access_token = result.data.access_token;
				slTokens.value.refresh_token = result.data.refresh_token;
				slTokens.value.expires = Date.now() + result.data.expires_in * 1000;
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	}
	
	streamlabs.getDonations(10)
		.then((result) => {
			console.log(result.data.data);
			console.log(result.data.data.length);
			recentDonations.value = result.data.data;
		})
		.catch((err) => {
			console.log(err.response.data);
		});	
});

let opts = {
	reconnect: true
};
const socket = io.connect(`https://sockets.streamlabs.com/?token=${nodecg.bundleConfig.socketToken}`, opts);
let emitter = new EventEmitter();

socket.on("event", event => {
    // No message? Must be an error, so we skip it because we already do raw emits.	
	if(!(event.message instanceof Object)) {
		nodecg.log.error(`Event ${event.event_id} had no ites in its event.message property, skipping.`);
	}
		
	if (event.type == "donation" && event.message.length >= 1) {
		console.log("new donation received!");
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

		// CHANGEME - do this in a more reliable way with streamlabs.getDonations
		donationTotal.value += parseFloat(message.amount.amount);
		
	}
});

