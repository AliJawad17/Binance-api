// const {Customer, validate} = require('../models/customer');
const {Conf, validate} = require('../models/conf');
const Binance = require('node-binance-api');

binance = new Binance().options({
  APIKEY: '<key>',
  APISECRET: '<secret>'
});

const addConf = async (req, res, next) => {
    // const {error} = validate(req.body);
    // if(error) return res.status(422).send(error.details[0].message);
    const data = req.body;
    // console.log(data);
    let conf = await new Conf({
        name: data.name,
        apiKey: data.apiKey,
        secretKey: data.secretKey,
        margin: data.margin,
        leverage: data.leverage,
        balanceBuffer: data.balanceBuffer
    });
    conf = await conf.save();
    res.redirect('/allConfs');
}

const addConfView = (req, res, next) => {
    res.render('confLayout/addConf');
}

const getAvailableBalance = async (req, res, next) => {
    const key = req.body;
    console.log('key in balance', key);
    binance = new Binance().options({
        APIKEY: key.apiKey,
        APISECRET: key.secretKey
    });
    console.log('binance response', 111);
    let balance;
    console.info(balance = await binance.futuresBalance());
    console.info('available balance', balance = balance[1]['availableBalance'] );
    
    return res.status(200).send({
        message: "found the balance",
        result: balance
    });
}

const getAllConfs = async (req, res, next) => {
    // console.log('all conf called');
    const list = await Conf.find().exec();
    // res.send(list);
    // return list;
    // console.log(list);
    res.render('confLayout/allConfs', {
        confs: list
    });
}

// const getAddCustomerView = (req, res, next) => {
//     res.render('addCustomer');
// }

// const addCustomer = async (req, res, next) => {
//     const {error} = validate(req.body);
//     if(error) return res.status(422).send(error.details[0].message);
//     const data = req.body;
//     let customer = await new Customer({
//         firstname: data.firstname,
//         lastname: data.lastname,
//         phonenumber: data.phonenumber,
//         cnic: data.cnic,
//         address: data.address
//     });
//     customer = await customer.save();
//     res.redirect('/');
// }

const getUpdateConfView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const c = await Conf.findById(id).exec();
        res.render('confLayout/updateConf', {
            conf: c
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateConf = async(req, res, next) => {
    // const {error} = validate(req.body);
    // if (error) return res.status(422).send(error.details[0].message);
    const id = req.params.id;
    const data = req.body;
    console.log('update conf ', data);
    let conf = await Conf.findByIdAndUpdate(id, {
        name: data.name,
        apiKey: data.apiKey,
        secretKey: data.secretKey,
        margin: data.margin,
        leverage: data.leverage,
        balanceBuffer: data.balanceBuffer
    }, {new: true});
    if(!conf) return res.status(404).send('Configuration with the given id not found');

    res.redirect('/allConfs');
}

const getDeleteConfView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const c = await Conf.findById(id).exec();
        res.render('confLayout/deleteConf', {
            conf: c
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteConf = async (req, res, next) => {
    try {
        const id = req.params.id;
        const conf = await Conf.findByIdAndRemove(id);
        if(!conf) return res.status(404).send('Configuration with the given id not found');
        res.redirect('/allConfs');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getAllConfs,
    // getAddCustomerView,
    // addCustomer,
    getAvailableBalance,
    getUpdateConfView,
    updateConf,
    getDeleteConfView,
    deleteConf,
    addConf,
    addConfView
}