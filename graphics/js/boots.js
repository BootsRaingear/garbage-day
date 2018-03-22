'use strict';

const donationTotal = nodecg.Replicant('donationTotal');
const currentHour = nodecg.Replicant('currentHour');
const segments = nodecg.Replicant('segments');
	
donationTotal.on('change', newVal => {
	app.totalDonations = newVal.toFixed(2);
});

currentHour.on('change', newVal => {
	app.hour = newVal;
});

segments.on('change', newVal => {
	
});