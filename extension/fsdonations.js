const app = require('express')();
const nodecg = require('./util/nodecg-api-context').get();
const sqlite3 = require('sqlite3').verbose();
const recentDonations = nodecg.Replicant('recentDonations');
const lastDonationTime = nodecg.Replicant('lastDonationTime');
const donationTotal = nodecg.Replicant('donationTotal');

nodecg.log.info("loading fsdonations.js");

let db = new sqlite3.Database('/srv/gd2020nnaf/gd_nnaf.db', (err) => {
	if (err) {
		nodecg.log.info(err.message);
	}
	nodecg.log.info('Connected to the database.');
  });

if (lastDonationTime.value < nodecg.bundleConfig.marathonStart) {
  lastDonationTime.value = nodecg.bundleConfig.marathonStart;
}

GrabRecentDonations();

function GrabRecentDonations() {
	let query = "SELECT id, displayname, message, amount, STRFTIME('%s', timestamp) AS dtime FROM Donations WHERE dtime > " + lastDonationTime.value + " ORDER BY id DESC LIMIT 25";
	db.all(query, [], (err, rows) => {
		if (err) {
			throw err;
		}

		recentDonations.value = rows;
		lastDonationTime.value = parseInt(rows[rows.length -1].dtime);
	});
}

function GetDonationTotal() {
	let query = "SELECT SUM(amount) as total FROM Donations WHERE dtime > " + nodecg.bundleConfig.marathonStart;
	var total = -1;
	db.all(query, [], (err, rows) => {
		if(err) {
			console.log(err);
		}else{
			total = rows[0].total;
		}
	});
	donationTotal.value = total;
}