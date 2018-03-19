const streamLabsUrl = 'https://www.streamlabs.com/api/v1.0/';

const OAuth2 = require('oauth20');
const axios = require('axios');
const axiosStreamLabs = axios.create({
	baseURL: streamLabsUrl
});

const nodecg = require('../util/nodecg-api-context').get();
const accessToken = nodecg.bundleConfig.streamlabs.accessToken;
const clientId = nodecg.bundleConfig.streamlabs.clientId;
const clientSecret = nodecg.bundleConfig.streamlabs.clientSecret;
const redirectUrl = nodecg.bundleConfig.streamlabs.redirectUrl;
const slTokens = nodecg.Replicant('slTokens');

module.exports = {
	authorize: function() {
		let params = {
			response_type: 'code',
			client_id: clientId,
			redirect_uri: redirectUrl,
			scope: 'donations.read'
		};
		axiosStreamLabs({
			method: 'GET',
			url: streamLabsUrl + 'authorize',
			params: params
		})
		  .then(function(response) {
			console.log(response.data);
			console.log(response.status);
			console.log(response.statusText);
			console.log(response.headers);
			console.log(response.config);
		});
		
	},
	refreshTokens: function() {
		let params = {
			grant_type: 'refresh_token',
			client_id: clientId,
			client_secret: clientSecret,
			redirect_uri: redirectUrl,
			refresh_token: slTokens.value.refresh_token
		};
		
		axiosStreamLabs({
			method: 'POST',
			url: streamLabsUrl + 'token',
			params: params
		})		  
		.then(function(response) {
			console.log(response.data);
			console.log(response.status);
			console.log(response.statusText);
			console.log(response.headers);
			console.log(response.config);
		});;
	},
	getDonations: function(limit) {
		
		if (slTokens.value.expires < Date.now())
		{
			//var r = refreshTokens();
			//console.log(r);
		}
			
		let params = {
			access_token: accessToken,
			limit: limit,
			currency: 'USD'
		};
				
		axiosStreamLabs({
			method: 'GET',
			url: streamLabsUrl + 'donations',
			params: params
		})
		  .then(function(response) {
			console.log(response.data);
			console.log(response.status);
			console.log(response.statusText);
			console.log(response.headers);
			console.log(response.config);
		});
	}
	
	
}




