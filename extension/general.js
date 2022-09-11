'use strict';
const nodecg = require('./util/nodecg-api-context').get();
const cron =  require('node-schedule');
const currentHour = nodecg.Replicant('currentHour');
const streamtwoControl = nodecg.Replicant('streamtwoControl');
const onBreak = nodecg.Replicant('onBreak');
const currentBreakImage = nodecg.Replicant('currentBreakImage');
const breakImages = nodecg.Replicant('assets:breakimages');
const fetishPrizes = nodecg.Replicant('fetishPrizes');
const currentFetishPrize = nodecg.Replicant('currentFetishPrize');
const buttonCooldowns = nodecg.Replicant('buttonCooldowns');
const mmmbop = nodecg.Replicant('mmmbop');
const clone = require('clone');


var coolDownInterval = setInterval(checkCoolDowns,500);
var onstart = true;

var breakImageRule = new cron.RecurrenceRule();
breakImageRule.second = [0, 15, 30, 45];


var rotateBreakImage = cron.scheduleJob(breakImageRule, function() {
	//nodecg.log.info("rotating break image");

	var curImg = currentBreakImage.value;
	curImg++
	if (curImg >= breakImages.value.length)
		curImg = 0;

	currentBreakImage.value = curImg;
});

currentHour.on('change', newVal => {
	if (onstart)
	{
		checkHour();
		onstart = false;
	}
});

onBreak.on('change', newVal => {
	if (newVal === true)
		checkHour();
});

nodecg.listenFor('playMmmbop', value => {
	mmmbop.value.videoShow = true;
	setTimeout(function() { mmmbop.value.videoShow = false; }, 5500);
});

// on the hour, change currentHour
const changeHour = cron.scheduleJob('0 * * * *', function() {	

	// add last hour's fetish prize winner to array, clear current fetish prize
	if ((currentHour.value > 0) && (currentHour.value <= 24)) {
		fetishPrizes.value.push(clone(currentFetishPrize.value));
		currentFetishPrize.value.topDonor = "";
		currentFetishPrize.value.topDonorAmount = 0;
	}
	
	checkHour();
});

function checkHour(onbreak = false) {
	if (Date.now() >= nodecg.bundleConfig.marathonStart) {
		var newHour = 1 + Math.round((Date.now() - nodecg.bundleConfig.marathonStart) / (1000 * 60 * 60));
		nodecg.log.info("marathon start: " + nodecg.bundleConfig.marathonStart + " , current time: " + Date.now());
		nodecg.log.info("current hour: " + newHour);
		if (newHour > currentHour.value)
		{
			if (newHour > 24)
				newHour = 24;
			else
				currentHour.value = newHour;

			nodecg.log.info("It is now hour: " + newHour);
			
			// reset settings for second stream
			streamtwoControl.value.disabled = true;
			streamtwoControl.value.swap = false;
		}
		
	} else 	{
		currentHour.value = 0;
		nodecg.log.info("Hour check: marathon has not yet started");
	}
	
}


function checkCoolDowns() {
	if (buttonCooldowns.value.mmmbopCooldown < Date.now() && buttonCooldowns.value.mmmbopDisabled == true)
		buttonCooldowns.value.mmmbopDisabled = false;	

	if (buttonCooldowns.value.themeSongCooldown < Date.now() && buttonCooldowns.value.themeSongDisabled == true)
		buttonCooldowns.value.themeSongDisabled = false;

	if (buttonCooldowns.value.readerIntrosCooldown < Date.now() && buttonCooldowns.value.readerIntrosDisabled == true)
		buttonCooldowns.value.readerIntrosDisabled = false;	
}