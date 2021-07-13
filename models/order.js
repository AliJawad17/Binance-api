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
    buyorderId: {
        type: Number,
    }, 
    sellorderId: {
        type: Number,
    }, 
    // sellprice: {
    //     type: Number,
    //     min: 0,
    //     // minlength: 5,
    //     // maxlength: 50,
    //     required: true
    // }, 
    trailingstoploss: {
        type: Number,
        min: 1,
        max: 100
    }, 
    amount: {
        type: Number,
        min: 0,
        // minlength: 11,
        required: true
    },
    quantity: {
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
        // sellprice: Joi.Number().min(0).required(),
        orderId: Joi.Number().min(0).required(),
        quantity: Joi.Number().min(0).required(),
        trailingstoploss: Joi.Number(),
        amount: Joi.Number().required(),
        // address: Joi.string().required()
    }

    return Joi.validate(order, schema);
}


module.exports.Order = Order;
module.exports.validate = validateOrder;