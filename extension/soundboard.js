'use strict';
const nodecg = require('./util/nodecg-api-context').get();
const currentHour = nodecg.Replicant('currentHour');
const segments = nodecg.Replicant('segments');

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

nodecg.listenFor('playThemeSong', value => {
	var message = "!playthemesong " + currentHour.value;
	sendDiscordWebhookMsg("!playthemesong")
})

nodecg.listenFor('playReaderIntros', value => {
	console.log("Received play reader intro command");
	var currentSegment = segments.value[currentHour.value];
	console.log(currentSegment);
	var castlist = currentSegment.ridiculist1 + " " + currentSegment.artistName;
	if (currentSegment.ridiculist2 && currentSegment.ridiculist2 !== "")
		castlist += " " + currentSegment.ridiculist2;
	if (currentSegment.ridiculist3 && currentSegment.ridiculist3 !== "")
		castlist += " " + currentSegment.ridiculist3;
	if (currentSegment.ridiculist4 && currentSegment.ridiculist4 !== "")
		castlist += " " + currentSegment.ridiculist4;
	if (currentSegment.ridiculist5 && currentSegment.ridiculist5 !== "")
		castlist += " " + currentSegment.ridiculist5;
	if (currentSegment.ridiculist6 && currentSegment.ridiculist6 !== "")
		castlist += " " + currentSegment.ridiculist6;
	if (currentSegment.ridiculist7 && currentSegment.ridiculist7 !== "")
		castlist += " " + currentSegment.ridiculist7;
	if (currentSegment.ridiculist8 && currentSegment.ridiculist8 !== "")
		castlist += " " + currentSegment.ridiculist8;

	var message = "!playintro " + currentHour.value + " " + castlist
	console.log(message);
	sendDiscordWebhookMsg(message);
})

function sendDiscordWebhookMsg(message) {
	var discord = require('./util/discord-webhook');
	discord.hookId = nodecg.bundleConfig.discord.webhooksId;
	discord.hookToken = nodecg.bundleConfig.discord.webhooksToken;
	discord.sendMessage(message);
}