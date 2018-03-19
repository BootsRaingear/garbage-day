// receives socket-io alerts from streamlabs on donation

const EventEmitter = require("events");
const io = require("socket.io-client");
const nodecg = require('./util/nodecg-api-context').get();
const donationTotal = nodecg.Replicant('donationTotal');
const battle = nodecg.Replicant('battle');

let opts = {
	reconnect: true
};

const socket = io.connect(`https://sockets.streamlabs.com/?token=${nodecg.bundleConfig.streamlabs.socketToken}`, opts);
let emitter = new EventEmitter();

nodecg.log.info("Streamlabs Socket IO connection established");

socket.on("event", event => {
    // No message? Must be an error, so we skip it because we already do raw emits.	
	if(!(event.message instanceof Object)) {
		nodecg.log.error(`Event ${event.event_id} had no ites in its event.message property, skipping.`);
	}
		
	console.log("streamlabs message received!");
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
		
		checkBattle(message);
	}
});

function checkBattle(msg) {
	if (battle.value.active)
	{
		let message = msg.message.toLowerCase();
		if (message.includes(battle.value.option1keyword) && !message(includes(battle.value.option2keyword))) {
			battle.value.option1total += parseFloat(msg.amount.amount);		
			nodecg.log.info("battle keyword: " + battle.value.option1keyword + " triggered, amount: " + msg.amount.amount);
		} else if (message.includes(battle.value.option2keyword) && !message(includes(battle.value.option1keyword))) {
			battle.value.option2total += parseFloat(msg.amount.amount);
			nodecg.log.info("battle keyword: " + battle.value.option2keyword + " triggered, amount: " + msg.amount.amount);
		}
	}
}