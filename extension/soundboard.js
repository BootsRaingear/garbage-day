'use strict';
const nodecg = require('./util/nodecg-api-context').get();
nodecg.listenFor('soundboardPlay', filename => {	
	var message = "!playsound " + filename;
	var discord = require('./util/discord-webhook');
	discord.hookId = '424268256807878659';
	discord.hookToken = 'oFtvV2mMQgIV79gIrVErwchyUcVg0MjZC80vtAskhJjmQzKf7AR3-xMKOBTmhXCh6YRR';
	discord.sendMessage(message);
});

//T+
//https://discordapp.com/api/webhooks/424326622557241354/klZ9fOl5-OmLAuH3szdv1Hc-Ietnbh__IFIiGugzyNAsWTjsyxE3NJplbaqh-hI-3Koy

//F+
//https://discordapp.com/api/webhooks/424268256807878659/oFtvV2mMQgIV79gIrVErwchyUcVg0MjZC80vtAskhJjmQzKf7AR3-xMKOBTmhXCh6YRR