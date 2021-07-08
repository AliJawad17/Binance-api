const mongoose = require('mongoose');
const Joi = require('joi');

const orderSchema = new mongoose.Schema({
    tokenname: {
        type: String,
        // minlength: 5,
        maxlength: 50,
        required: true
    },
    buyprice: {
        type: Number,
        min: 0,
        // minlength: 5,
        // maxlength: 50,
        required: true
    }, 
    stoploss: {
        type: Number,
        min: 0,
        // minlength: 11,
        required: true
    }, 
    amount: {
        type: Number,
        min: 0,
        // minlength: 11,
        required: true
    },
    confId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

const validateOrder = (order) => {
    const schema = {
        tokenname: Joi.string().max(50).required(),
        buyprice: Joi.Number().min(0).required(),
        stoploss: Joi.Number().min(0).required(),
        amount: Joi.Number().required(),
        // address: Joi.string().required()
    }

    return Joi.validate(order, schema);
}


module.exports.Order = Order;
module.exports.validate = validateOrder;