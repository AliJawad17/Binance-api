const mongoose = require('mongoose');
const Joi = require('joi');

const tickerSchema = new mongoose.Schema({
    tickername: {
        type: String,
        // minlength: 5,
        maxlength: 50,
        required: true
    },
    tickerprice: {
        type: Number,
        min: 0,
        // minlength: 5,
        // maxlength: 50,
        required: true
    }, 
    change: {
        type: String,
        min: 0,
        // minlength: 11,
        required: true
    }
});

const Ticker = mongoose.model('Ticker', tickerSchema);

const validateTicker = (ticker) => {
    const schema = {
        tickername: Joi.string().max(50).required(),
        tickerprice: Joi.Number().min(0).required(),
        change: Joi.String().required(),
        // cnic: Joi.string().required(),
        // address: Joi.string().required()
    }

    return Joi.validate(ticker, schema);
}


module.exports.Ticker = Ticker;
module.exports.validate = validateTicker;