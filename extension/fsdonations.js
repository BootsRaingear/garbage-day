const app = require('express')();
const nodecg = require('./util/nodecg-api-context').get();
const bodyParser = require('body-parser')();

const wfSecret = nodecg.Replicant('wfSecret');



//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

nodecg.log.info("loading fsdonations.js");

app.get('/hook', function(req, res, next) {
    nodecg.log.info("received webhooks request");
    res.status(200).end();
	//res.json({ challenge: req.query.challenge});
});

/*
function validateSignature(body, secret, signature) {
	nodecg.log.info("validating signature");
	var hash = crypto.createHmac('SHA256', secret)
	  .update(JSON.stringify(body))
	  .digest('base64');
	return (hash === signature);
  }


app.post('/hook', function(req, res, next) {
	console.log('Received webhook request:', req.body);
	console.log(req.get('X-Exl-Signature'));
	
	if (!validateSignature(req.body,
		wfSecret,
		req.get('X-Exl-Signature'))) {
			return res.status(401).send({errorMessage: 'Invalid Signature'});
		}
	res.status(204).send();
});
*/