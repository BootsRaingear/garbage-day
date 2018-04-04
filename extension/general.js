'use strict';
const nodecg = require('./util/nodecg-api-context').get();
const cron =  require('node-schedule');
const currentHour = nodecg.Replicant('currentHour');
const streamtwoControl = nodecg.Replicant('streamtwoControl');
const onBreak = nodecg.Replicant('onBreak');
const currentBreakImage = nodecg.Replicant('currentBreakImage');
const breakImages = nodecg.Replicant('assets:breakimages');

var onstart = true;

var breakImageRule = new cron.RecurrenceRule();
breakImageRule.second = [0, 15, 30, 45];

var rotateBreakImage = schedule.scheduleJob(breakImageRule, function() {
	 = currentBreakImage.value;
	if (curImg >= breakImages.value.length)
	{
		curImg = 0;
	}
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

// on the hour, change currentHour
var changeHour = cron.scheduleJob('0 * * * *', function() {	
	checkHour();
});

function checkHour(onbreak = false) {
	if (Date.now() >= nodecg.bundleConfig.marathonStart) {
		var newHour = 1 + Math.round((Date.now() - nodecg.bundleConfig.marathonStart) / (1000 * 60 * 60));
		if (newHour > 24)
			newHour = 24;
		
		currentHour.value = newHour;
		
		// reset settings for second stream
		streamtwoControl.value.disabled = false;
		streamtwoControl.value.swap = false;
		nodecg.log.info("It is now hour: " + newHour);
	} else 	{
		currentHour.value = 0;
		nodecg.log.info("Hour check: marathon has not yet started");
	}
	
}