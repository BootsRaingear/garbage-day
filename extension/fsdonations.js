const app = require('express')();
const nodecg = require('./util/nodecg-api-context').get();
const sqlite3 = require('sqlite3').verbose();
const recentDonations = nodecg.Replicant('recentDonations');
const lastDonationTime = nodecg.Replicant('lastDonationTime');
const donationTotal = nodecg.Replicant('donationTotal');
const battle = nodecg.Replicant('battle');
const prize = nodecg.Replicant('prize');
const mmmbop = nodecg.Replicant('mmmbop');
const albertClass = nodecg.Replicant('albertClass');

const albertCategories = ["jogging", "lsd", "throb", "storm", "cataracts", "vibrate", "rave", "drunk", "sepia", "oversaturate", "huerotate", "no-outlines", "no-trash", "contrast", "invert", "black", "blue", "brown", "green", "greyscale", "white", "tan", "yellow", "orange", "red", "pink", "purple", "teal", "spin"];
const albertKeywords = {
	"jogging": ["jog", "run", "trot", "sprint", "ran", "sped", "speed", "fast", "sonic"],
	"lsd": ["lsd", "drug", "trip", "acid", "psychedelic","woooo","whoa"],
	"throb": ["throb", "pulse", "pulsar", "quasar", "heart"],
	"spin": ["spin", "rotate", "turn", "beer", "twirl","whirl", "swirl", "anakin", "roll", "spiral"],
	"storm": ["storm","flash", "lightning", "cold", "rain", "maelstrom"],
	"cataracts": ["cataracts", "blur", "fuzz", "vision", "blind"],
	"vibrate": ["vibrate", "shake", "rattle", "quiver", "tremble", "trembling", "shaking", "vibrating", "vibration", "quake"],
	"dance": ["dance", "bop", "pony", "twist", "apart", "chubby", "beat", "shimmy", "ballet", "jive", "disco"],
	"rave": ["rave"],
	"drunk": ["drunk"],
	"no-outlines": ["no-outlines", "waver", "pale", "flat", "line", "pasty", "pasta", "pastel", "bleach", "line"],
	"no-trash": ["no-trash", "empty", "clean", "tidy", "free", "parkour", "diggity"],
	"dropshadow": ["dropshadow", "shadow", "creepy", "hole", "abyss", "space", "darkness", "vortex"],
	"sepia": ["sepia", "old", "ancient", "aged", "prospector", "instagram", "poser", "poseur"],
	"oversaturate": ["saturate", "bright", "sun", "lightening", "pretentious"],
	"huerotate": ["huerotate","groovy","circle","blink","wow"],
	"invert": ["invert", "flip", "over", "ugly", "fugly", "negative"],
	"contrast": ["contrast", "opposite", "not"],
	"black": ["black", "ebony", "crow", "midnight", "ink", "raven", "oil", "grease", "maroon", "onyx", "pitch", "soot", "sable", "jet", "coal", "metal", "obsidian", "jade", "spider", "leather"],
	"blue": ["blue", "slate", "sky", "navy", "indigo", "cobalt", "ocean", "peacock", "azure", "lapis", "spruce", "stone", "aegean", "berry", "denim", "admiral", "arctic"],
	"brown": ["brown", "coffee", "mocha", "peanut", "carob", "hickory", "wood", "pecan", "walnut", "caramel", "gingerbread", "syrup", "chocolate", "tortilla", "umber", "tawny", "brunette", "cinnamon", "penny", "cedar"],
	"green": ["green", "chartreuse", "juniper", "sage", "lime", "fern", "olive", "emerald", "pear", "moss", "shamrock", "pine", "parakeet", "mint", "seaweed", "pickle", "pistachio", "basil", "crocodile"],
	"teal": ["teal", "aqua", "sapphire", "cerulean", "seafoam", "cyan", "turquoise"],
	"greyscale": ["grey", "shadow", "graphite", "iron", "pewter", "cloud", "silver", "smoke", "slate", "anchor", "ash", "porpoise", "dove", "fog", "flint", "charcoal", "pebble", "lead", "coin", "fossil"],
	"white": ["white", "pearl", "alabaster", "snow", "ivory", "cream", "eggshell", "cotton", "chiffon", "salt", "lace", "coconut", "linen", "bone", "daisy", "powder", "frost", "porcelain", "parchment", "rice", "diamond"],
	"tan": ["tan", "beige", "macaroon", "hazelwood", "granola", "oat", "egg nog", "fawn", "sand", "sepia", "latte", "oyster", "biscotti", "parmesan", "hazelnut", "sandcastle", "buttermilk", "shortbread"],
	"yellow": ["yellow", "canary", "gold", "daffodil", "flaxen", "butter", "lemon", "mustard", "corn", "medallion", "dandelion", "fire", "bumblebee", "banana", "butterscotch", "dijon", "honey", "blonde", "pineapple"],
	"orange": ["orange", "tangerine", "merigold", "cider", "rust", "ginger", "tiger", "fire", "bronze", "cantaloupe", "apricot", "clay", "honey", "carrot", "squash", "spice", "marmalade", "amber", "sandstone", "yam"],
	"red": ["red", "cherry", "amaranth", "rose", "jam", "merlot", "garnet", "crimson", "ruby", "scarlet", "wine", "brick", "apple", "mahogany", "blood", "sangria", "berry", "currant", "blush", "candy", "lipstick"],
	"pink": ["pink", "rose", "fuchsia", "punch", "blush", "watermelon", "flamingo", "rouge", "salmon", "coral", "peach", "strawberry", "rosewood", "lemonade", "taffy", "bubblegum", "crepe", "magenta"],
	"purple": ["purple", "mauve", "violet", "boysenberry", "lavender", "plum", "magenta", "lilac", "grape", "periwinkle", "sangria", "eggplant", "jam", "iris", "heather", "amethyst", "raisin", "orchid", "mulberry"]
};


let db = new sqlite3.Database('/srv/gd2020nnaf/gd_nnaf.db', (err) => {
	if (err) {
		nodecg.log.info(err.message);
	}
	nodecg.log.info('Connected to the donation SQLite database.');
  });

if (lastDonationTime.value * 1000 < nodecg.bundleConfig.marathonStart) {
  lastDonationTime.value = 0;
}

GrabRecentDonations();
GetDonationTotal();

function GrabNewDonations() {
	let query = "SELECT id, displayname, message, amount, STRFTIME('%s', timestamp) AS dtime, STRFTIME('%H:%M:%S', timestamp) AS ftime FROM Donations WHERE CAST(dtime as SINGLE) > " + lastDonationTime.value + " ORDER BY CAST(dtime AS SINGLE) ASC";
	db.all(query, [], (err, rows) => {
		if (err) {
			throw err;
		}
		if (rows.length > 0)
		{
			rows.forEach((row) => { 
				nodecg.log.info("New Donation received: " + row.displayname + " | " + row.amount + " | " + row.message);
				checkBattle(row);
				checkPrize(row);
				checkAlbert(row);			
				nodecg.sendMessage('donationAlert', row);
			});
			lastDonationTime.value = parseInt(rows[rows.length -1].dtime);
		}
	});
}

function GrabRecentDonations() {
//  var oneHrAgo = Date.now() - 60*60*1000;

//	let query = "SELECT id, displayname, message, amount, STRFTIME('%s', timestamp) AS dtime, STRFTIME('%H:%M:%S', timestamp) AS ftime FROM Donations WHERE CAST(dtime AS SINGLE) > " + (oneHrAgo / 1000) + " ORDER BY id DESC LIMIT 25";	
	let query = "SELECT id, displayname, message, amount, STRFTIME('%s', timestamp) AS dtime, STRFTIME('%H:%M:%S', timestamp) AS ftime FROM Donations ORDER BY id DESC LIMIT 25";
	db.all(query, [], (err, rows) => {
		if (err) {
			throw err;
		}
		if (rows.length > 0)
		{

		}
		recentDonations.value = rows;
	});
}

function GetDonationTotal() {
	let query = "SELECT SUM(amount) AS total FROM Donations";
	var total = -1;
	db.all(query, [], (err, rows) => {
		if(err) {
			nodecg.log.info(err);
		}else{
			if (rows[0].total == null) 
				total = 0;
			else 
				total = rows[0].total;

			if (donationTotal.value != total) {
				donationTotal.value = total;
				checkMmmbop(total);
				checkFunNumbers(total);
			}
		}
	});
}

// grab recent donations from streamlabs api every 2 seconds
setInterval(() => {
	GrabNewDonations();
	GrabRecentDonations();
	GetDonationTotal();
}, 5 * 1000);

/*
displayname
message
amount
dtime
*/

function checkBattle(msg) {
	if (battle.value.active)
	{
		let message = msg.message.toLowerCase();
		var match1 = message.indexOf(battle.value.option1keyword) !== -1;
		var match2 = message.indexOf(battle.value.option2keyword) !== -1;
		
		if (match1 && !match2) {
			battle.value.option1total += parseFloat(msg.amount);		
			nodecg.log.info("battle keyword: " + battle.value.option1keyword + " triggered, amount: " + msg.amount);
		} else if (match2 && !match1) {
			battle.value.option2total += parseFloat(msg.amount);
			nodecg.log.info("battle keyword: " + battle.value.option2keyword + " triggered, amount: " + msg.amount);
		}
	}
}

function checkPrize(msg) {
	if (prize.value.active)
	{
		if (parseFloat(msg.amount) >= prize.value.amount)
		{
			prize.value.claimed = true;
			prize.value.claimedBy = msg.displayname;
			prize.value.claimAmount = parseFloat(msg.amount);
		}
	}
}

function checkMmmbop(dTotal) {
	var nextMilestone = mmmbop.value.nextMilestone;
	var mmmbopsAvailable = mmmbop.value.mmmbopsAvailable;
	while (dTotal > nextMilestone)
	{
		mmmbopsAvailable++;
		nextMilestone += 100;
	}
	mmmbop.value.mmmbopsAvailable = mmmbopsAvailable;
	mmmbop.value.nextMilestone = nextMilestone;
}


function checkAlbert(msg) {
	var donationAmt = parseFloat(msg.amount);
	let message = msg.message.toLowerCase();	
	if (donationAmt >= 0.5)
	{
		for (var i = 0; i < albertCategories.length; i++)
		{			
			var curKeyword = albertCategories[i];
			for (var j = 0; j < (albertKeywords[curKeyword]).length; j++)
			{
				if (message.indexOf(albertKeywords[curKeyword][j]) !== -1)
				{
					nodecg.log.info("Changing Albert state to: " + curKeyword);
					albertClass.value = curKeyword;
					return;
				}
			}
		}
	}
}

function checkFunNumbers(total) {
	var n = total.toFixed(2).replace('.','');
	var digits = (""+n).split("");
	var isFourTwenty = false;
	var isSixNine = false;

	// check for 420s and 69s
	for (i = 0; i <= digits.length -3; i++)
	{
		if (digits[i] == 4 && digits[i+1] == 2 && digits[i+2] == 0)
			isFourTwenty = true;
		if (digits[i] == 6 && digits[i+1] == 9)
			isSixNine = true;
	}

	if (isFourTwenty)
	{
		nodecg.sendMessage('fourTwenty', null);
		nodecg.log.info("Found a Four Twenty!");
	}

	if (isSixNine)
	{
		nodecg.sendMessage('sixNine', null);
		nodecg.log.info("Found a Six Nine!");
	}
}