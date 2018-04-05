'use strict';

const donationTotal = nodecg.Replicant('donationTotal');
const currentHour = nodecg.Replicant('currentHour');
const segments = nodecg.Replicant('segments');
const battle = nodecg.Replicant('battle');
const donationGoal = nodecg.Replicant('donationGoal');
const freewrite = nodecg.Replicant('freewrite');
const prize = nodecg.Replicant('prize');
const streamtwoControl = nodecg.Replicant('streamtwoControl');
const breakImages = nodecg.Replicant('assets:breakimages');
const currentBreakImage = nodecg.Replicant('currentBreakImage');
const streamtext = nodecg.Replicant('streamtext');

var stream2active = false;
var hourFetched = false;
var segFetched = false;

donationTotal.on('change', newVal => {
	app.totalDonations = newVal.toFixed(2);
});

currentHour.on('change', newVal => {
	app.hour = newVal;
	hourFetched = true;
	
	if (segFetched) 
		updateCast(segments.value[newVal]);	
		
});

segments.on('change', newVal => {
	segFetched = true;
	console.log('schedule updated');
	if (hourFetched)
		updateCast(newVal[app.hour]);
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

streamtwoControl.on('change', newVal => {
	if (!newVal.disabled) {
		app.secondaryStream.show = true;
	} else {
		app.secondaryStream.show = false;
	}
	app.swapStreams = newVal.swap;
});

streamtext.on('change', newVal => {
	app.introText = newVal.introText;
	app.breakText = newVal.breakText;
	app.logoURL = newVal.logoURL;
	app.underTotalText = newVal.underTotalText;
});

currentBreakImage.on('change', newVal => {
	app.breakPic = breakImages.value[newVal].url;
});

function updateCast(segment)
{
	app.artist = segment.artistName;

	app.primaryStream.url = segment.artistURL;
	app.title = segment.title;
	app.provider = segment.docProvider;
	var iReaders = [];
	iReaders[0] = segment.ridiculist1;
	iReaders[1] = segment.ridiculist2;
	if (segment.ridiculist3 && segment.ridiculist3 !== "")	
		iReaders[2] = segment.ridiculist3;
	if (segment.ridiculist4 && segment.ridiculist4 !== "")	
		iReaders[3] = segment.ridiculist4;
	if (segment.ridiculist5 && segment.ridiculist5 !== "")	
		iReaders[4] = segment.ridiculist5;
	if (segment.ridiculist7 && segment.ridiculist6 !== "")	
		iReaders[5] = segment.ridiculist6;
	if (segment.ridiculist7 && segment.ridiculist7 !== "")	
		iReaders[6] = segment.ridiculist7;
	if (segment.ridiculist8 && segment.ridiculist8 !== "")	
		iReaders[7] = segment.ridiculist8;
	
	app.readers = iReaders;
	
	app.secondaryStream.name = segment.streamtwoName;
	app.secondaryStream.url = segment.streamtwoURL;
	if (app.secondaryStream.url === "")
	{
		stream2active = false;
		app.secondaryStream.enabled = false;
		app.secondaryStream.show = false;
	} else {
		stream2active = true;
		app.secondaryStream.enabled = true;
		app.secondaryStream.show = true;
	}
	
  
}


