const https = require('https');
const party_api_config = require('../config/party-api-config.js');
//https://stackoverflow.com/questions/38533580/nodejs-how-to-promisify-http-request-reject-got-called-two-times

var options = {
    //Imam užklausos configus iš config failo
    host: party_api_config.api_url,
    path: party_api_config.api_params,
    port: party_api_config.api_port
  };


function getCurrency(base_currency, quote_currency, base_amount){
    
    var promise = new Promise(function(resolve, reject) {
        
        req = https.request(options, function(response)
            {
                var str = '';

                //another chunk of data has been received, so append it to `str`
                response.on('data', function (chunk) {
                    str += chunk;
                });
            
                //the whole response has been received, so we just print it out here
                response.on('end', function () {
                    resolve(str);
                    //console.log(str);
                });
            }
        );
        req.end();
    });

    return promise.then(function(result){
        console.log(result);
        return result;
    });
    
}

module.exports.getCurrency = getCurrency;

