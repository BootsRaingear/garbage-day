'use strict';
const nodecg = require('./util/nodecg-api-context').get();
nodecg.listenFor('soundboardPlay', filename => {	
	var message = "!playsound " + filename;
	sendDiscordWebhookMsg(message);
});

nodecg.listenFor('victorPlay', filename => {	
	var message = "!playvictor " + filename;
	sendDiscordWebhookMsg(message);
});

nodecg.listenFor('playMmmbop', value => {
	sendDiscordWebhookMsg("!playmmmbop phGfHvPSjajs");
});

function sendDiscordWebhookMsg(message) {
	var discord = require('./util/discord-webhook');
	discord.hookId = nodecg.bundleConfig.discord.webhooksId;
	discord.hookToken = nodecg.bundleConfig.discord.webhooksToken;
	discord.sendMessage(message);
}