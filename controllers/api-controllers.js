const partyExchangeProvider = require('../services/party-exchange-provider.js');
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
        //send request to 3 party exchange API
        promise = Promise.resolve(partyExchangeProvider.getCurrency(base_currency, quote_currency, base_amount)).then(function(result){
                
          res.setHeader('Content-Type', 'application/json');
          //res.end(JSON.stringify(result));
          res.end(result);
        });
      } else {
        res.setHeader('Content-Type', 'application/json');
          //res.end(JSON.stringify(result));
        res.end('{"error":' + error_message + '}');
      }
      
    });
}

module.exports.rootController = rootController;
module.exports.getQuoteController = getQuoteController;