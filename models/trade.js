const mongoose = require('mongoose');
const Joi = require('joi');

const tradeSchema = new mongoose.Schema({
    apiKey: {
        type: String,
        // minlength: 5,
        // maxlength: 50,
        required: true
    },
    secretKey: {
        type: String,
        // minlength: 5,
        // maxlength: 50,
        required: true
    }, 
    margin: {
        type: Number,
        required: true
    },
    leverage: {
        type: Number,
        min: 1,
        max: 125,
        required: true
    }, 
    balanceBuffer: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    }
});

const Trade = mongoose.model('Trade', tradeSchema);

const validateTrade = (trade) => {
    const schema = {
        apiKey: Joi.string().required(),
        secretKey: Joi.string().required(),
        margin: Joi.Number().required(),
        leverage: Joi.Number().min(1).max(125).required(),
        balanceBuffer: Joi.Number().min(0).max(100).required()
    }

    return Joi.validate(trade, schema);
}


module.exports.Trade = Trade;
module.exports.validate = validateTrade;