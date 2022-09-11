﻿'use strict';
const app = require('express')();
const nodecg = require('./util/nodecg-api-context').get();

const testmode = true;

const donations = testmode ? nodecg.Replicant('tiltTestDonations') : nodecg.Replicant('donations', 'nodecg-tiltify');
const alldonations = testmode ? nodecg.Replicant('tiltTestAllDonations') : nodecg.Replicant('alldonations', 'nodecg-tiltify'); 
const donationtotal = testmode ? nodecg.Replicant('tiltTestTotal') : nodecg.Replicant('total', 'nodecg-tiltify');

const donationpolls = nodecg.Replicant('donationpolls','nodecg-tiltify');
const rewards = nodecg.Replicant('rewards','nodecg-tiltify');

const milestones = nodecg.Replicant('milestone');
const activeRewardId = nodecg.Replicant('activeRewardId');
const activePollId = nodecg.Replicant('activePollId');

const mmmbop = nodecg.Replicant('mmmbop');
const albertClass = nodecg.Replicant('albertClass');

const albertCategories = ["reset",
    "jogging", "running", "throb", "spin", "storm", "cataracts", "vibrate", "rave", "drunk", "flipping", "ghost", 
    "no-outlines", "no-trash", "dropshadow", "queen", "censored", "huge", "backwards", "aibert",
    "oversaturate", "invert", "sepia", "contrast", "black", "blue", "brown", "green", "teal", "grayscale", "white", "tan", "yellow", "orange", "red", "pink", "purple"];
    
    
const albertKeywords = {

    // RESET
    "reset": [ "reset", "normal", "initialize", "default" ],

    // ANIMATIONS
    "jogging":      ["jogging", "jog" ],
    "running":      [ "running", "sprinting", "sonic" ],
    "throb":        ["throb", "pulse" ],
    "spin":         ["spin", "rotate" ],
    "storm":        ["storm", "lightning"],
    "cataracts":    ["cataracts", "blurry" ],
    "vibrate":      ["vibrate", "stoked", "quake"],
    "rave":         ["rave", "lsd", "drug trip", "psychedelic"],
    "drunk":        ["drunk", "booze", "shitfaced", "hammered"],
    "flipping":     [ "flipping", "coin toss", "coin flip"],
    "ghost":        [ "ghost", "undead", "floating"],
    
    // OTHER VISUAL EFFECTS
    "no-outlines":  ["no-outlines", "no outlines"],
    "no-trash":     ["no-trash", "no trash", "empty"],
    "dropshadow":   ["dropshadow", "shadow" ],
    "queen":        [ "queen", "elizabeth","dignity", "respect" ],
    "censored":     [ "censored", "censor", "nudity", "too hot" ],
    "huge":         [ "huge", "giant", "gigantic", "massive"],
    "backwards":    [ "backwards", "opposite", "flipped"],
    "aibert":       [ "aibert", "dall-e", "dalle", "dall e", "midjourney"],

    // COLOR PALETTES
    "oversaturate": ["oversaturate", "too bright"],
    "invert":       ["invert", "photonegative"],
    "sepia":        ["sepia", "old fashioned"],
    "contrast":     ["contrast" ],
    "grayscale":    ["grayscale", "greyscale" ],
    "black":        ["black", "ebony", "onyx", "obsidian"],
    "blue":         ["blue", "indigo", "cobalt", "azure", "lapis" ],
    "brown":        ["brown", "mocha", "umber", "tawny"],
    "green":        ["green", "chartreuse", "sage", "lime", "emerald", "moss" ],
    "teal":         ["teal", "aqua", "sapphire", "cerulean", "seafoam", "cyan", "turquoise"],
    "white":        ["white", "pearl", "alabaster", "snow", "ivory", "eggshell", "salt", "lace", "linen", "bone", "porcelain"],
    "tan":          ["tan", "beige" ],
    "yellow":       ["yellow", "gold", "daffodil" ],
    "orange":       ["orange", "tangerine", "merigold"],
    "red":          ["red", "cherry", "crimson", "scarlet"],
    "pink":         ["pink", "hot pink", "fuchsia", "salmon", "coral", "bubblegum", "magenta"],
    "purple":       ["purple", "mauve", "violet", "lavender", "plum", "lilac", "grape", "periwinkle", "eggplant" ]
    
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
    for(const reward of Object.values(array))    {
        // check for oldest active reward
        if (reward.active === true) {
            if (activeRewardId.value !== reward.id) {
                if (activeRewardId === 0) 
                    nodecg.sendMessage('showReward', 'true');
                
                activeRewardId.value = reward.id;
            }
            nodecg.log.info("Active reward is: " + reward.id + " - " + reward.name);
            break;
        }
    }
    nodecg.log.info("There is no active reward");
    if (activeRewardId.value !== 0) {
        nodecg.sendMessage('showReward', 'false');
        activeRewardId.value = 0;
    }
}

function GetActivePoll(array) {
    for(const poll of Object.values(array))    {
        if (poll.active === true) {
            nodecg.log.info("Active poll is: " + poll.id + " - " + poll.name);
            activePollId.value = poll.id;
            return;
        }
    }
    nodecg.log.info("There is no active poll");
    activePollId.value = 0;
}

function GetNewDonations(array) {
    for(const donation of Object.values(array))  {
        if (donation.read) continue;
        nodecg.sendMessage('donationAlert', donation);
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
    while (total > nextMilestone) {
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


                if (curKeyword == "aibert") {
                    const i =  Math.floor(Math.random() * (8 - 1 + 1) + 1)
                    albertClass.value = "aibert-"+i;
                }

                return;
            }
        }
    }



}

function checkFunNumbers(total) {
    if (total == null) return;
    
    let n = Number(total).toFixed(2).replace('.', '');
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
    if (isFourTwenty) {
        nodecg.sendMessage('fourTwenty', null);
        nodecg.log.info("Found a Four Twenty!");
    }

    if (isSixNine) {
        nodecg.sendMessage('sixNine', null);
        nodecg.log.info("Found a Six Nine!");
    }    
}