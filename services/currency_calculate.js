var Round = require('fin-rounds').Round;

//Return calculated quote_amount for selected currency exchange_rate
var quote_amount_calcucale = function(rates_ob, quote_currency, base_amount){
    console.log(quote_currency);
    exchange_rate = rates_ob[quote_currency];
    quote_amount = base_amount/100 * exchange_rate;
       
    //Round rules
    var round_rate = new Round('bank', 3);
    var round_amount = new Round('bank', 2);
    
    //forming of return object
    var out_ob = {
      exchange_rate : round_rate(exchange_rate),
      quote_amount : round_amount(quote_amount)*100
    }

    return out_ob;
}

module.exports.quote_amount_calcucale = quote_amount_calcucale;

