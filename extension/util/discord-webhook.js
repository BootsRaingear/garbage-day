'use strict';

module.exports = {
    hookId: '',
    hookToken: '',
    userName:'',
    avatarUrl:'',
    sendMessage:  function(msg) {
        var querystring = require('querystring');
        var https = require('https');

        var data = {
            'content':msg,
            'username':this.userName,
            'avatar_url':this.avatarUrl
        };

        var postBody = querystring.stringify(data);

        var options = {
            hostname: 'canary.discordapp.com',
            port: 443,
            path: '/api/webhooks/'+this.hookId+'/'+this.hookToken,
            method: 'POST',
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postBody.length
            }
        };

        var postreq = https.request(options);

        postreq.write(postBody);
        postreq.end();
    }
};