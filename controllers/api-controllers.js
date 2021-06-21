const partyExchangeProvider = require('../services/party-exchange-provider.js');
const currencyCalculate = require('../services/currency_calculate.js');

var LruCache = require('lru-cache');

var lru_cache = new LruCache({  
  max : 2,                   // The maximum number of items allowed in the cache
  maxAge : 10000     // The maximum life of a cached item in milliseconds
});

let error_message = "Please send correct request with attributes. Example: /quote?base_currency=EUR&quote_currency=USD&base_amount=10004";

let rootController = function(app){
    app.get('/', (req, res) => {
      res.end('{"message":' + error_message + '}');
    });
}
 
let getQuoteController = function(app){

    app.get('/quote', (req, res) => {
      
      //get request params
      base_currency = req.query.base_currency;
      quote_currency = req.query.quote_currency;
      base_amount = req.query.base_amount;

      if(base_currency != undefined && quote_currency != undefined && base_amount != undefined){

        var rates_ob = lru_cache.get('rates_ob' + base_currency);
        if(!rates_ob){
          //send request to 3 party exchange API
          Promise.resolve(partyExchangeProvider.getCurrencyData(base_currency)).then(function(result){
            currency_data = JSON.parse(result);
            rates_ob = currency_data.rates;
            lru_cache.set('rates_ob' + base_currency, rates_ob);
            
            out_ob = currencyCalculate.quote_amount_calcucale(rates_ob, quote_currency, base_amount);

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(out_ob));
            
          });
        } else {
          out_ob = currencyCalculate.quote_amount_calcucale(rates_ob, quote_currency, base_amount);

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(out_ob));
        }

      } else {
        res.setHeader('Content-Type', 'application/json');
          //res.end(JSON.stringify(result));
        res.end('{"error":' + error_message + '}');
      }
      
    });
}

module.exports.rootController = rootController;
module.exports.getQuoteController = getQuoteController;