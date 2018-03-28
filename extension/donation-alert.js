// receives socket-io alerts from streamlabs on donation

const EventEmitter = require("events");
const io = require("socket.io-client");
const nodecg = require('./util/nodecg-api-context').get();
const donationTotal = nodecg.Replicant('donationTotal');
const battle = nodecg.Replicant('battle');
const prize = nodecg.Replicant('prize');
const mmmbop = nodecg.Replicant('mmmbop');

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
		
		var newTotal = donationTotal.value + parseFloat(message.amount.amount);
		
		donationTotal.value = newTotal;
		
		checkBattle(message);
		checkPrize(message);
		checkMmmbop(newTotal);
	}
});

function checkBattle(msg) {
	if (battle.value.active)
	{
		let message = msg.message.toLowerCase();
		var match1 = message.indexOf(battle.value.option1keyword) !== -1;
		var match2 = message.indexOf(battle.value.option2keyword) !== -1;
		
		if (match1 && !match2) {
			battle.value.option1total += parseFloat(msg.amount.amount);		
			nodecg.log.info("battle keyword: " + battle.value.option1keyword + " triggered, amount: " + msg.amount.amount);
		} else if (match2 && !match1) {
			battle.value.option2total += parseFloat(msg.amount.amount);
			nodecg.log.info("battle keyword: " + battle.value.option2keyword + " triggered, amount: " + msg.amount.amount);
		}
	}
}

function checkPrize(msg) {
	if (prize.value.active)
	{
		if (parseFloat(msg.amount.amount) > prize.value.amount)
		{
			prize.value.claimed = true;
			prize.value.claimedBy = msg.name;
			prize.value.claimAmount = parseFloat(msg.amount.amount);
		}
	}
}

function checkMmmbop(dTotal) {
	var nextMilestone = mmmbop.value.nextMilestone;
	var mmmbopsAvailable = mmmbop.value.mmmbopsAvailable;
	while (dTotal > nextMilestone)
	{
		mmmbopsAvailable++;
		nextMilestone += 100;
	}
	mmmbop.value.mmmbopsAvailable = mmmbopsAvailable;
	mmmbop.value.nextMilestone = nextMilestone;
}