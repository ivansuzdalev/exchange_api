const partyExchangeProvider = require('../services/party-exchange-provider.js');
const currencyCalculate = require('../services/currency_calculate.js');
const supported_currency = require('../config/supported-currency-config.js');

var LruCache = require('lru-cache');

var lru_cache = new LruCache({  
  max : 2,                   // The maximum number of items allowed in the cache
  maxAge : 10000     // The maximum life of a cached item in milliseconds
});

let error_message = "Please send correct request with attributes. Example: /quote?base_currency=EUR&quote_currency=USD&base_amount=10004";

/* controller route "/" */
let rootController = function(app){
    app.get('/', (req, res) => {
      res.end('{"message":' + error_message + '}');
    });
}
 
/* controller route "/quote" */
let getQuoteController = function(app){

    app.get('/quote', (req, res) => {
      
      //get request params
      base_currency = req.query.base_currency;
      quote_currency = req.query.quote_currency;
      base_amount = req.query.base_amount;
      //Check is all params in request ?
      if(base_currency != undefined || quote_currency != undefined || base_amount != undefined)
      {

        //Check base currency in allowed currencys list
        if(supported_currency.currency_arr[base_currency] == true) 
        {

          //Check is exist rates object for selected currency  in chache storage
          var rates_ob = lru_cache.get('rates_ob' + base_currency);
          if(!rates_ob){
            //send request to 3 party exchange API
            Promise.resolve(partyExchangeProvider.getCurrencyData(base_currency)).then(function(result){
              currency_data = JSON.parse(result);
              
              //Take rates part from responce object
              rates_ob = currency_data.rates;

              //cashing of rates object for selected currency 
              lru_cache.set('rates_ob' + base_currency, rates_ob);
              
              //calculating quote_amount for selected currency exchange_rate
              out_ob = currencyCalculate.quote_amount_calcucale(rates_ob, quote_currency, base_amount);
  
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(out_ob));
              
            });
          } else {
            //calculating quote_amount for selected currency exchange_rate getted from cache
            out_ob = currencyCalculate.quote_amount_calcucale(rates_ob, quote_currency, base_amount);
  
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(out_ob));
          }
  
        } else { 
          //Out currency list as JSON error message

          res.setHeader('Content-Type', 'application/json');
                    
          var supported_currency_list = '';
          for (const [key, value] of Object.entries(supported_currency.currency_arr)) {
            supported_currency_list = supported_currency_list + ' ' + key;
          }
          
          res.end('{"error":"supported only this base currency: ' + supported_currency_list + '"}');
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