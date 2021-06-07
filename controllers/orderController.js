const {Order, validate} = require('../models/order');
// const {Trade} = require('../models/trade');

// const setupTrade = async (req, res, next) => {
//     // const {error} = validate(req.body);
//     // if(error) return res.status(422).send(error.details[0].message);
//     const data = req.body;

//     let trade = await new Trade({
//         apiKey: data.apiKey,
//         secretKey: data.secretKey,
//         margin: data.margin,
//         leverage: data.leverage,
//         balanceBuffer: data.balanceBuffer
//     });
//     trade = await trade.save();
//     res.redirect('/');
// }

const getAllOrders = async (req, res, next) => {
    const list = await Order.find().exec();
    res.render('allOrders', {
        orders: list
    });
}

const getAddOrderView = (req, res, next) => {
    res.render('addOrder');
}

// const setupTradeView = (req, res, next) => {
//     res.render('setupTrade');
// }

const addOrder = async (req, res, next) => {
    // const {error} = validate(req.body);
    // if(error) return res.status(422).send(error.details[0].message);
    const data = req.body;
    let order = await new Order({
        tokenname: data.tokenname,
        buyprice: data.buyprice,
        stoploss: data.stoploss,
        // cnic: data.cnic,
        // address: data.address
    });
    order = await order.save();
    res.redirect('/allOrders');
}

const getUpdateOrderView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const oneorder = await Order.findById(id).exec();
        res.render('updateOrder', {
            order: oneorder
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateOrder = async(req, res, next) => {
    // const {error} = validate(req.body);
    // if (error) return res.status(422).send(error.details[0].message);
    const id = req.params.id;
    const data = req.body;
    let order = await Order.findByIdAndUpdate(id, {
        tokenname: data.tokenname,
        buyprice: data.buyprice,
        stoploss: data.stoploss,
        // cnic: data.cnic,
        // address: data.address
    }, {new: true});
    if(!order) return res.status(404).send('Order with the given id not found');

    res.redirect('/allOrders');
}

const getDeleteOrderView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const oneorder = await Order.findById(id).exec();
        res.render('deleteOrder', {
            order: oneorder
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteOrder = async (req, res, next) => {
    try {
        const id = req.params.id;
        const order = await Order.findByIdAndRemove(id);
        if(!order) return res.status(404).send('Order with the given id not found');
        res.redirect('/allOrders');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getAllOrders,
    getAddOrderView,
    addOrder,
    getUpdateOrderView,
    updateOrder,
    getDeleteOrderView,
    deleteOrder,
    // setupTrade,
    // setupTradeView
}