'use strict';
const nodecg = require('./util/nodecg-api-context').get();
const cron =  require('node-schedule');
const currentHour = nodecg.Replicant('currentHour');
const streamtwoControl = nodecg.Replicant('streamtwoControl');


// on the hour, change currentHour
var changeHour = cron.scheduleJob('0 * * * *', function() {	
	if (Date.now() >= nodecg.config.marathonStart) {
		var newHour = round((Date.now() - nodecg.config.marathonStart) / (1000 * 60 * 60));
		currentHour.value = newHour;
		
		// reset settings for second stream
		streamtwoControl.value.disabled = false;
		streamtwoControl.value.swap = false;
		nodecg.log.info("It is now hour: " + newHour);
	} else 	{
		currentHour.value = 0;
		nodecg.log.info("Hour check: marathon has not yet started");
	}
});
