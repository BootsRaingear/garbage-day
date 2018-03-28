'use strict';

const donationTotal = nodecg.Replicant('donationTotal');
const currentHour = nodecg.Replicant('currentHour');
const segments = nodecg.Replicant('segments');
const battle = nodecg.Replicant('battle');
const donationGoal = nodecg.Replicant('donationGoal');
const freewrite = nodecg.Replicant('freewrite');
const prize = nodecg.Replicant('prize');
	
var hourFetched = false;
var segFetchNeeded = false;

donationTotal.on('change', newVal => {
	app.totalDonations = newVal.toFixed(2);
});

currentHour.on('change', newVal => {
	app.hour = newVal + 1; //FIXME : change back to | app.hour = newVal;
	hourFetched = true;
	
	if (segFetchNeeded) {
		updateCast(segments.value[app.hour]);
	}
		
});

segments.on('change', newVal => {
	if (hourFetched)
		updateCast(newVal[app.hour]);
	else
		segFetchNeeded = true;
});

battle.on('change', newVal => {
	app.battle.active = newVal.active;
	app.battle.option1title = newVal.option1title;
	app.battle.option1keyword = newVal.option1keyword;
	app.battle.option1total = newVal.option1total;
	app.battle.option2title = newVal.option2title;
	app.battle.option2keyword = newVal.option2keyword;
	app.battle.option2total = newVal.option2total;
});

donationGoal.on('change', newVal => {
	app.goal.active = newVal.active;
	app.goal.amount = newVal.amount;
	app.goal.startAmount = newVal.startAmount;
	app.goal.text = newVal.text;
});

freewrite.on('change', newVal => {
	app.freewrite.active = newVal.active;
	app.freewrite.content = newVal.content;
	app.freewrite.img = newVal.img;
	app.freewrite.location = newVal.location;
});

prize.on('change', newVal => {
	app.prize.active = newVal.active;
	app.prize.amount = newVal.amount;
	app.prize.claimed = newVal.claimed;
	app.prize.claimedBy = newVal.claimedBy;
	app.prize.provider = newVal.awardProvider;
	app.prize.text = newVal.description;
//	app.prize.claimAmount = newVal.claimAmount;
});

function updateCast(segment)
{
	app.artist = segment.artistName;

	app.primaryStream.url = segment.artistURL;
	app.title = segment.title;
	app.provider = segment.docProvider;
	app.readers[0] = segment.ridiculist1;
	app.readers[1] = segment.ridiculist2;
	app.readers[2] = segment.ridiculist3;
	app.readers[3] = segment.ridiculist4;
	app.readers[4] = segment.ridiculist5;
	app.readers[5] = segment.ridiculist6;
	app.secondaryStream.name = segment.streamtwoName;
	app.secondaryStream.url = segment.streamtwoURL;
	if (app.secondaryStream.url === "")
		app.secondaryStream.enabled = false;	
}
