var Round = require('fin-rounds').Round;

var quote_amount_calcucale = function(rates_ob, quote_currency, base_amount){

    exchange_rate = rates_ob[quote_currency];
    quote_amount = base_amount * exchange_rate;
    
    console.log(exchange_rate);
    
    //Round rules
    var round_rate = new Round('bank', 3);
    var round_amount = new Round('bank', 2);
    
    var out_ob = {
      exchange_rate : round_rate(exchange_rate),
      quote_amount : round_amount(quote_amount)
    }

    return out_ob;
}

module.exports.quote_amount_calcucale = quote_amount_calcucale;

