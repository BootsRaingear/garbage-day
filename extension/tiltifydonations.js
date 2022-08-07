'use strict';
const app = require('express')();
const nodecg = require('./util/nodecg-api-context').get();

const donations = nodecg.Replicant('donations','nodecg-tiltify');
const alldonations = nodecg.Replicant('alldonations','nodecg-tiltify');
const donationtotal = nodecg.Replicant('total','nodecg-tiltify');
const donationpolls = nodecg.Replicant('donationpolls','nodecg-tiltify');
const rewards = nodecg.Replicant('rewards','nodecg-tiltify');
const milestones = nodecg.Replicant('milestone');
const activeRewardId = nodecg.Replicant('activeRewardId');
const activePollId = nodecg.Replicant('activePollId');

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

nodecg.log.info("Donation Total: " + donationtotal.value);
GetActiveReward(rewards.value);
GetActivePoll(donationpolls.value);
checkMmmbop(donationtotal.value);
    
rewards.on('change', newVal => {
    GetActiveReward(newVal);
});

donationpolls.on('change', newVal => {
    GetActivePoll(newVal);
});

donations.on('change', newVal => {
   GetNewDonations(newVal); 
});

function GetActiveReward(array) {
    for(const reward of Object.values(array))
    {
        if (reward.active === true)        {
            activeRewardId.value = reward.id;
            nodecg.log.info("Active reward is: " + reward.id + " - " + reward.name);
            return;
        }
    }
    nodecg.log.info("There is no active reward");
    activeRewardId.value = 0;
}

function GetActivePoll(array) {
    for(const poll of Object.values(array))
    {
        if (poll.active === true)
        {
            nodecg.log.info("Active poll is: " + poll.id + " - " + poll.name);
            activePollId.value = poll.id;
            return;
        }
    }
    nodecg.log.info("There is no active poll");
    activePollId.value = 0;
}

function GetNewDonations(array) {
    for(const donation of Object.values(array))
    {
        if (donation.read) continue;
        // do something with new donation?
        nodecg.log.info("read new donation! " + donation.comment + " : " + donation.amount);
        checkAlbert(donation.amount, donation.comment);
    }
    // mark all donations as read
    nodecg.sendMessageToBundle('clear-donations', 'nodecg-tiltify');
    checkMmmbop(donationtotal.value);
    checkFunNumbers(donationtotal.value);
}



function checkMmmbop(total) {
    if (total == null) return;
    
    let nextMilestone = mmmbop.value.nextMilestone;
    let mmmbopsAvailable = mmmbop.value.mmmbopsAvailable;
    while (total > nextMilestone)
    {
        mmmbopsAvailable++;
        nextMilestone += 100;
    }
    mmmbop.value.mmmbopsAvailable = mmmbopsAvailable;
    mmmbop.value.nextMilestone = nextMilestone;
}

function checkAlbert(amount, comment) {
    if (comment == null || amount == null) return;
    let donationAmt = parseFloat(amount);
    let message = comment.toLowerCase();
    if (donationAmt < 0.5) {
        return;
    }
    
    for (let i = 0; i < albertCategories.length; i++) {
        const curKeyword = albertCategories[i];
        for (let j = 0; j < (albertKeywords[curKeyword]).length; j++) {
            if (message.indexOf(albertKeywords[curKeyword][j]) !== -1) {
                nodecg.log.info("Changing Albert state to: " + curKeyword);
                albertClass.value = curKeyword;
                return;
            }
        }
    }
}

function checkFunNumbers(total) {
    if (total == null) return;
    
    let n = total.toFixed(2).replace('.', '');
    let digits = ("" + n).split("");
    let isFourTwenty = false;
    let isSixNine = false;

    // check for 420s and 69s
    for (let i = 0; i <= digits.length - 3; i++) {
        if (digits[i] === '4' && digits[i + 1] === '2' && digits[i + 2] === '0')
            isFourTwenty = true;
        if (digits[i] === '6' && digits[i + 1] === '9')
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