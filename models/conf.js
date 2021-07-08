const mongoose = require('mongoose');
const Joi = require('joi');

const confSchema = new mongoose.Schema({
    name: {
        type: String,
        // minlength: 5,
        // maxlength: 50,
        required: true
    },
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
        type: String,
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

const Conf = mongoose.model('Conf', confSchema);

const validateConf = (conf) => {
    const schema = {
        apiKey: Joi.string().required(),
        secretKey: Joi.string().required(),
        margin: Joi.string().required(),
        leverage: Joi.Number().min(1).max(125).required(),
        balanceBuffer: Joi.Number().min(0).max(100).required()
    }

    return Joi.validate(conf, schema);
}


module.exports.Conf = Conf;
module.exports.validate = validateConf;