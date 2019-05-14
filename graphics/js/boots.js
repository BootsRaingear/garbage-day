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
const mmmbopVideos = nodecg.Replicant('assets:hansonvideos');
const currentBreakImage = nodecg.Replicant('currentBreakImage');
const streamtext = nodecg.Replicant('streamtext');
const cast = nodecg.Replicant('cast');
const albertClass = nodecg.Replicant('albertClass');

var stream2active = false;

donationTotal.on('change', newVal => {
	app.totalDonations = newVal.toFixed(2);
});

currentHour.on('change', newVal => {
	app.hour = newVal;	
	NodeCG.waitForReplicants(cast,segments).then(() => {	
		updateCast(segments.value[newVal]);	
	});
});

segments.on('change', newVal => {
	console.log('schedule updated');
	NodeCG.waitForReplicants(cast,currentHour).then(() => {
		updateCast(newVal[app.hour]);
	});
});

battle.on('change', newVal => {
	app.battle.active = newVal.active;
	app.battle.option1title = newVal.option1title;
	app.battle.option1keyword = newVal.option1keyword;
	app.battle.option1total = Number.parseFloat(newVal.option1total).toFixed(2);
	app.battle.option2title = newVal.option2title;
	app.battle.option2keyword = newVal.option2keyword;
	app.battle.option2total = Number.parseFloat(newVal.option2total).toFixed(2);
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

albertClass.on('change', newVal => {
	app.albertClass = newVal;
});

nodecg.listenFor('playMmmbop', value => {
	var milles;
	if (app.totalDonations >= 10000)
		milles = 10;
	else
		milles = Math.floor(app.totalDonations / 1000);
	var filename = '/assets/garbage-day/mmmbopvideos/canson' + milles + '.mp4';
	console.log(filename);
	app.hanson.video = filename;
	app.hanson.active = true;
	setTimeout(function() { app.hanson.active = false; }, 5500);
});

function findCastInList(name)
{
	for (var i = 0; i < cast.value.length; i++) 
	{
		if (cast.value[i].name === name) {
			console.log("Found name: " + cast.value[i].displayName + " at index " + i)
			return i;			
		}
	}
	return -1	
}
function getCastFullName(name)
{
	var idx = findCastInList(name);
	if (idx >= 0)
		return cast.value[idx].displayName
	return name;
}

function updateCast(segment)
{

	app.artist = segment.artistName;

	app.primaryStream.url = segment.artistURL;
	app.title = segment.title;
	app.provider = segment.docProvider;
	var iReaders = [];
	iReaders[0] = getCastFullName(segment.ridiculist1);
	if (segment.ridiculist2 && segment.ridiculist2 !== "")	
		iReaders[1] = getCastFullName(segment.ridiculist2);
	if (segment.ridiculist3 && segment.ridiculist3 !== "")	
		iReaders[2] = getCastFullName(segment.ridiculist3);
	if (segment.ridiculist4 && segment.ridiculist4 !== "")	
		iReaders[3] = getCastFullName(segment.ridiculist4);
	if (segment.ridiculist5 && segment.ridiculist5 !== "")	
		iReaders[4] = getCastFullName(segment.ridiculist5);
	if (segment.ridiculist7 && segment.ridiculist6 !== "")	
		iReaders[5] = getCastFullName(segment.ridiculist6);
	if (segment.ridiculist7 && segment.ridiculist7 !== "")	
		iReaders[6] = getCastFullName(segment.ridiculist7);
	if (segment.ridiculist8 && segment.ridiculist8 !== "")	
		iReaders[7] = getCastFullName(segment.ridiculist8);
	
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
