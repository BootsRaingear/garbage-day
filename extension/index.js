'use strict';

// Packages
const cheerio = require('cheerio');
const request = require('request-promise').defaults({jar: true}); // <= Automatically saves and re-uses cookies.

// Ours
const nodecgApiContext = require('./util/nodecg-api-context');

module.exports = function (nodecg) {		
	nodecgApiContext.set(nodecg);
	
	require('./obs');
	require('./obs-control');	
	require('./schedule');
	require('./soundboard');
};