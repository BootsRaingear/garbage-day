'use strict';

//const donationTotal = nodecg.Replicant('donationTotal');
const currentHour = nodecg.Replicant('currentHour');
const segments = nodecg.Replicant('segments');
const battle = nodecg.Replicant('battle');
const donationGoal = nodecg.Replicant('donationGoal');
const freewrite = nodecg.Replicant('freewrite');
const prize = nodecg.Replicant('prize');
const streamtwoControl = nodecg.Replicant('streamtwoControl');
const breakImages = nodecg.Replicant('assets:breakimages');
const mmmbop = nodecg.Replicant('mmmbop');
//const mmmbopVideos = nodecg.Replicant('assets:hansonvideos');
const currentBreakImage = nodecg.Replicant('currentBreakImage');
const streamtext = nodecg.Replicant('streamtext');
const cast = nodecg.Replicant('cast');
const albertClass = nodecg.Replicant('albertClass');

var testmode = true;
//const donation = testmode ? nodecg.Replicant('tiltTestDonations') : nodecg.Replicant('donations', 'nodecg-tiltify');
const alldonations = testmode ? nodecg.Replicant('tiltTestAllDonations') : nodecg.Replicant('alldonations', 'nodecg-tiltify');
const donationTotal = testmode ? nodecg.Replicant('tiltTestTotal') : nodecg.Replicant('total', 'nodecg-tiltify');
const donationpolls = nodecg.Replicant('donationpolls','nodecg-tiltify');
const rewards = nodecg.Replicant('rewards','nodecg-tiltify');

var stream2active = false;

donationTotal.on('change', newVal => {
	var dTotal = Number(newVal);
	app.totalDonations = dTotal.toFixed(2);
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

mmmbop.on('change', newVal => {
	if (newVal.videoShow) {
		app.hanson.active = true;
	} else
		app.hanson.active = false;
})

nodecg.listenFor('playMmmbop', value => {
	var milles;
	if (app.totalDonations >= 10000)
		milles = 10;
	else
		milles = Math.floor(app.totalDonations / 1000);
	//var filename = '/assets/garbage-day/mmmbopvideos/canson' + milles + '.mp4';
	var filename = "http://localhost:8000/canson" + milles + '.mp4';
	//app.hanson.video = filename;
});

nodecg.listenFor('showComparativeItem', value => {
	console.log("showing comparative item");
	app.findComparativeItem();
})

nodecg.listenFor('sixNine', value => {
	app.haveASixtyNine();
});

nodecg.listenFor('fourTwenty', value => {
	app.smokeWeed();
});

nodecg.listenFor('donationAlert', value => {	
	console.table([value.name, value.amount, value.comment]);

	// Let's look at that donation amount...
	let formattedNumber;

	if (Number(value.amount) === value.amount && value.amount % 1 !== 0) {
		// This is a float!
		let f = value.amount.toFixed(2).toString().split('.');
		formattedNumber = "$" + f[0] + '<sup style="font-size:60%; text-decoration:underline;">' + f[1] + "</sup>";
	} else {
		// this is an integer
		formattedNumber = "$" + parseInt(value.amount) + "<sup></sup>";
	}

	let amount = parseFloat(value.amount);
	let donationType;
	if (!amount || isNaN(value.amount) || isNaN(amount)) {
		donationType = "error";
	} else if (amount < 2)  {
		donationType = "tiny";
	} else if (amount < 10)  {
		donationType = "small";
	} else if (amount < 99)  {
		donationType = "regular";
	} else {
		donationType = "big";
	} 

	// Let's look at the name of the donator...
	let notifyTitle;
	if (!value.name || value.name === "" || value.comment.toLowerCase().includes("anony")) {
		notifyTitle = "Anonymous $"+ value.amount + " Donation";
	} else {

		let notifyName;
		if (value.name.length > 25) {
			notifyName = value.name.substring(0,25) + '...';
		} else {
			notifyName = value.name;
		}

		notifyTitle = formattedNumber + " | " + notifyName;
	}

	// Let's look at the donation message...
	let notifyMessage;
	if (!value.comment || value.comment === "" || value.comment.length < 2) {
		notifyMessage = "";
	} else if (value.comment.length > 64) {
		notifyMessage = value.comment.substring(0,64) + '...';
	} else {
		notifyMessage = value.comment;
	}

	if (donationType === "error") {
		new PNotify({
			title: "SOMETHING FUCKED UP!",
			type: "error",
			delay: 30000
		});
	} else if (donationType === "tiny") {
		new PNotify({
			text: "someone donated $" + value.amount,
			delay: 10000
		});
	} else if (donationType === "small") {
		new PNotify({
			text: '<b>' + notifyTitle + '</b>',
			delay: 10000
		});
	} else if (donationType === "regular") {
		new PNotify({
			title: notifyTitle,
			text: notifyMessage,
			delay: 30000
		});
	} else if (donationType === "big") {
		new PNotify({
			title: formattedNumber + " | " + value.name,
			text: value.comment,
			delay: 60000
		});
	}
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
	console.log("Checking name: " + name);
	var idx = findCastInList(name);
	if (idx >= 0)
		return cast.value[idx].displayName
	return name;
}

function updateCast(segment)
{
	if (segment.artistName) {
		app.artist = getCastFullName(segment.artistName);
	} else {
		app.artist = "";
	}


	// LET'S PARSE A YOUTUBE LINK...

	// I STOLE THIS REGEX FROM STACK OVERFLOW.
	// BUT IT TOTALLY FUCKING WORKS.

	function youtube_parser(url){
		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
		var match = url.match(regExp);
		return (match&&match[7].length===11)? match[7] : false;
	}

	let youTube = false;
	let slug = "";

	if (segment.artistURL.includes("youtu")) {
		youTube = true;
		slug = youtube_parser(segment.artistURL);
		app.primaryStream.url = "https://www.youtube.com/embed/"+slug+"?autoplay=1&controls=0&origin=https://urbanwizards.com";
	} else {
		app.primaryStream.url = segment.artistURL;
	}

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
	if (segment.ridiculist6 && segment.ridiculist6 !== "")	
		iReaders[5] = getCastFullName(segment.ridiculist6);
	if (segment.ridiculist7 && segment.ridiculist7 !== "")	
		iReaders[6] = getCastFullName(segment.ridiculist7);
	if (segment.ridiculist8 && segment.ridiculist8 !== "")	
		iReaders[7] = getCastFullName(segment.ridiculist8);
	
	app.readers = iReaders;
	
	app.secondaryStream.name = segment.streamtwoName;
	app.secondaryStream.url = segment.streamtwoURL;


	// Same URL trickery, but this time with the second stream
	if (segment.streamtwoURL && segment.streamtwoURL.includes("youtu")) {
		youTube = true;
		slug = youtube_parser(segment.streamtwoURL);
		app.secondaryStream.url = "https://www.youtube.com/embed/"+slug+"?autoplay=1&controls=0&origin=https://urbanwizards.com";
	} else {
		app.secondaryStream.url = segment.streamtwoURL;
	}

	if (segment.streamtwoURL === "")
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
