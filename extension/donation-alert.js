// receives socket-io alerts from streamlabs on donation

const EventEmitter = require("events");
const io = require("socket.io-client");
const nodecg = require('./util/nodecg-api-context').get();
const donationTotal = nodecg.Replicant('donationTotal');
const battle = nodecg.Replicant('battle');
const prize = nodecg.Replicant('prize');
const mmmbop = nodecg.Replicant('mmmbop');
const currentFetishPrize = nodecg.Replicant('currentFetishPrize');
const albertClass = nodecg.Replicant('albertClass');

const albertCategories = ["jogging", "lsd", "throb", "spin", "storm", "catacacts", "sepia", "oversaturate", "huerotate", "contrast", "invert", "black", "blue", "brown", "green", "grey", "white", "tan", "yellow", "orange", "red", "pink", "purple", "teal"];
const albertKeywords = {
	"jogging": ["jog", "run", "trot", "sprint"],
	"lsd": ["lsd", "drug", "trip", "acid"],
	"throb": ["throb"],
	"spin": ["spin", "rotate", "turn"],
	"storm": ["storm"],
	"catacacts": ["cataracts", "blur", "fuzz"],
	"sepia": ["sepia"],
	"oversaturate": ["saturate", "bright"],
	"huerotate": ["huerotate"],
	"invert": ["invert"],
	"contrast": ["contrast"],
	"black": ["black", "ebony", "crow", "midnight", "ink", "raven", "oil", "grease", "onyx", "pitch", "soot", "sable", "jet", "coal", "metal", "obsidian", "jade", "spider", "leather"],
	"blue": ["blue", "slate", "sky", "navy", "indigo", "cobalt", "ocean", "peacock", "azure", "lapis", "spruce", "stone", "aegean", "berry", "denim", "admiral", "arctic"],
	"brown": ["brown", "coffee", "mocha", "peanut", "carob", "hickory", "wood", "pecan", "walnut", "caramel", "gingerbread", "syrup", "chocolate", "tortilla", "umber", "tawny", "brunette", "cinnamon", "penny", "cedar"],
	"green": ["green", "chartreuse", "juniper", "sage", "lime", "fern", "olive", "emerald", "pear", "moss", "shamrock", "pine", "parakeet", "mint", "seaweed", "pickle", "pistachio", "basil", "crocodile"],
	"teal": ["teal", "aqua", "sapphire", "cerulean", "seafoam", "cyan"],
	"greyscale": ["grey", "shadow", "graphite", "iron", "pewter", "cloud", "silver", "smoke", "slate", "anchor", "ash", "porpoise", "dove", "fog", "flint", "charcoal", "pebble", "lead", "coin", "fossil"],
	"white": ["white", "pearl", "alabaster", "snow", "ivory", "cream", "eggshell", "cotton", "chiffon", "salt", "lace", "coconut", "linen", "bone", "daisy", "powder", "frost", "porcelain", "parchment", "rice"],
	"tan": ["tan", "beige", "macaroon", "hazelwood", "granola", "oat", "egg nog", "fawn", "sand", "sepia", "latte", "oyster", "biscotti", "parmesan", "hazelnut", "sandcastle", "buttermilk", "shortbread"],
	"yellow": ["yellow", "canary", "gold", "daffodil", "flaxen", "butter", "lemon", "mustard", "corn", "medallion", "dendelion", "fire", "bumblebee", "banana", "butterscotch", "dijon", "honey", "blonde", "pineapple"],
	"orange": ["orange", "tangerine", "merigold", "cider", "rust", "ginger", "tiger", "fire", "bronze", "cantaloupe", "apricot", "clay", "honey", "carrot", "squash", "spice", "marmalade", "amber", "sandstone", "yam"],
	"red": ["red", "cherry", "rose", "jam", "merlot", "garnet", "crimson", "ruby", "scarlet", "wine", "brick", "apple", "mahogany", "blood", "sangria", "berry", "currant", "blush", "candy", "lipstick"],
	"pink": ["pink", "rose", "fuscia", "punch", "blush", "watermelon", "flamingo", "rouge", "salmon", "coral", "peach", "strawberry", "rosewood", "lemonade", "taffy", "bubblegum", "crepe", "magenta"],
	"purple": ["purple", "mauve", "violet", "boysenberry", "lavender", "plum", "magenta", "lilac", "grape", "periwinkle", "sangria", "eggplant", "jam", "iris", "heather", "amethyst", "raisin", "orchid", "mulberry"]
};

let opts = {
	reconnect: true
};

const socket = io.connect(`https://sockets.streamlabs.com/?token=${nodecg.bundleConfig.streamlabs.socketToken}`, opts);
let emitter = new EventEmitter();

nodecg.log.info("Streamlabs Socket IO connection established");

socket.on("event", event => {
    // No message? Must be an error, so we skip it because we already do raw emits.	
	if(!(event.message instanceof Object)) {
		nodecg.log.error(`Event ${event.event_id} had no ites in its event.message property, skipping.`);
	}
		
	if (event.type == "donation" && event.message.length >= 1) {
		let message = {
			id: event.message[0].id || event.message[0]._id || null,
			name: event.message[0].name,
			amount: {
				amount: event.message[0].amount,
				currency: event.message[0].currency
			},
			formatted_amount: event.message[0].formatted_ammount,
			message: event.message[0].message
		};
		nodecg.sendMessage("donation", message);
		emitter.emit("donation", message);
		
		var newTotal = donationTotal.value + parseFloat(message.amount.amount);
		
		donationTotal.value = newTotal;
		
		checkBattle(message);
		checkPrize(message);
		checkMmmbop(newTotal);		
		//checkFetishPrize(message);
		checkAlbert(message);
	}
});

function checkBattle(msg) {
	if (battle.value.active)
	{
		let message = msg.message.toLowerCase();
		var match1 = message.indexOf(battle.value.option1keyword) !== -1;
		var match2 = message.indexOf(battle.value.option2keyword) !== -1;
		
		if (match1 && !match2) {
			battle.value.option1total += parseFloat(msg.amount.amount);		
			nodecg.log.info("battle keyword: " + battle.value.option1keyword + " triggered, amount: " + msg.amount.amount);
		} else if (match2 && !match1) {
			battle.value.option2total += parseFloat(msg.amount.amount);
			nodecg.log.info("battle keyword: " + battle.value.option2keyword + " triggered, amount: " + msg.amount.amount);
		}
	}
}

function checkPrize(msg) {
	if (prize.value.active)
	{
		if (parseFloat(msg.amount.amount) >= prize.value.amount)
		{
			prize.value.claimed = true;
			prize.value.claimedBy = msg.name;
			prize.value.claimAmount = parseFloat(msg.amount.amount);
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

/*
function checkFetishPrize(msg) {
	var donationAmt = parseFloat(msg.amount.amount);
	if (donationAmt > currentFetishPrize.value.topDonorAmount)
	{
		currentFetishPrize.value.topDonor = msg.name;
		currentFetishPrize.value.topDonorAmount = donationAmt;
	}
}
*/

function checkAlbert(msg) {
	var donationAmt = parseFloat(msg.amount.amount);
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
					albertClass.value = curKeyword;
					return;
				}
			}
		}
	}
}


