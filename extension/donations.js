const app = require('express')();

const clone = require('clone');

const nodecg = require('./util/nodecg-api-context').get();
const StreamLabs = require('streamlabs');
const streamlabs = new StreamLabs(
		nodecg.bundleConfig.streamlabs.clientId, 
		nodecg.bundleConfig.streamlabs.clientSecret, 
		nodecg.bundleConfig.streamlabs.redirectUrl, 
		"donations.read donations.create alerts.create socket.token"
);

const recentDonations = nodecg.Replicant('recentDonations');
const slTokens = nodecg.Replicant('slTokens');

const slAuthUrl = nodecg.Replicant('slAuthUrl')
slAuthUrl.value = streamlabs.authorizationUrl();

var checkToken = new Promise (
	function (resolve, reject) {
		console.log(slTokens.value.refresh_token);
		if (slTokens.value.expires < Date.now()) {
			streamlabs.reconnect(slTokens.value.refresh_token)
				.then((result) => {
					slTokens.value.access_token = result.data.access_token;
					slTokens.value.refresh_token = result.data.refresh_token;
					slTokens.value.expires = Date.now() + result.data.expires_in * 1000;
					resolve(result.data);
				})
				.catch((err) => {
					nodecg.log.error('unable to refresh token');					
					reject(new Error('unable to refresh token'));
				});
			
		}
		resolve(true);
	}
);

app.get('/connect', (req, res) => {
	streamlabs.connect(req.query.code)
		.then((result) => {
			res.json(result.data);
			slTokens.value.access_token = result.data.access_token;
			slTokens.value.refresh_token = result.data.refresh_token;
			slTokens.value.expires = Date.now() + result.data.expires_in * 1000;
		})
		.catch((err) => { 
			res.json(err.response.data);
		});
});
app.listen(8080);

// grab recent donations from streamlabs api every minute
setInterval(() => {
	nodecg.log.info('[donations] Grabbings recent donations from Streamlabs API.');
	checkToken
	.then(() => { 
		return streamlabs.getDonations(25);
	})
	.then((result) => {
		rDonations = result.data.data;
		
		// remove any donations from before marathon start
		var j = rDonations.length
		while (j--) {
			if (parseInt(rDonations[j].created_at) * 1000 < nodecg.bundleConfig.marathonStart) 
				rDonations.splice(j,1);
		}

		for (var i = 0; i < rDonations.length; i++) {
			var amount = parseFloat(rDonations[i].amount);
			rDonations[i].formatted_amount = amount.toFixed(2);			
		}
		recentDonations.value = rDonations;
	})
	.catch((err) => {
		console.log(err);
	});	
}, 60 * 1000);




