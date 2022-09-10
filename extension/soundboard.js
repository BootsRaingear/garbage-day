'use strict';
const nodecg = require('./util/nodecg-api-context').get();
const currentHour = nodecg.Replicant('currentHour');
const segments = nodecg.Replicant('segments');

nodecg.listenFor('soundboardPlay', filename => {	
	var message = "!playsound " + filename;
	sendDiscordWebhookMsg(message);
});

nodecg.listenFor('playMmmbop', value => {
	sendDiscordWebhookMsg("!playmmmbop phGfHvPSjajs");
});

nodecg.listenFor('playThemeSong', value => {
	var message = "!playthemesong " + currentHour.value;
	sendDiscordWebhookMsg(message);
})

function sendDiscordWebhookMsg(message) {
	var discord = require('./util/discord-webhook');
	discord.hookId = nodecg.bundleConfig.discord.webhooksId;
	discord.hookToken = nodecg.bundleConfig.discord.webhooksToken;
	discord.sendMessage(message);
}