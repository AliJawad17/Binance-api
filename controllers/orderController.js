const {Order, validate} = require('../models/order');
const {Conf} = require('../models/conf');
const Binance = require('node-binance-api');

binance = new Binance().options({
  APIKEY: '<key>',
  APISECRET: '<secret>'
});
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
    res.render('orderLayout/allOrders', {
        orders: list
    });
}

const getAddOrderView = async (req, res, next) => {
    const confs = await Conf.find().exec();
    // let exchangeInfo = await binance.exchangeInfo();
    let exchangeInfo = await binance.futuresExchangeInfo();
    
    // console.log(exchangeInfo)
    let tickArr = [];
    exchangeInfo.symbols.forEach((symbol) => {
        tickArr.push(symbol.symbol);
      });

    console.log(tickArr);
    res.render('orderLayout/addOrder', {
        confs: confs, tickArr: tickArr
    });
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
        // sellprice: data.sellprice,
        trailingstoploss: data.trailingstoploss,
        amount: data.amount,
        confId: data.confId
    });
    console.log('req body in add order', data);
    let conf;
    console.log('conf response', data.confId);
    if(data.confId != ''){
        conf = await Conf.findById({_id: data.confId}).exec();//, async (resp) => {
        binance = new Binance().options({
            APIKEY: conf.apiKey,
            APISECRET: conf.secretKey
        });
        console.log('binance response', 111);
        // let balance = await binance.futuresBalance();
        // console.info(balance = balance[1]['availableBalance'] );
        // console.info( await binance.futuresLiquidationOrders() );
        let lvrge = await binance.futuresLeverageBracket( "LINKUSDT" );
        console.info( 'leverage bracket', lvrge[0]['brackets'][0] );
        console.info( 'leverage bracket', lvrge[0]['brackets'][1] );
        console.info( 'leverage bracket', lvrge[0]['brackets'][2] );
        console.info(await binance.futuresLeverage( data.tokenname, conf.leverage ));
        // console.info( await binance.futuresMarginType( 'BNBUSDT', 'CROSSED' ) );
        let tickersQuantity;
        let price = await binance.prices(data.tokenname, async (error, ticker) => {
            console.info("Price of COIN: ", ticker[data.tokenname]);
            tickersQuantity = +data.amount/ticker[data.tokenname];
            console.log('tickersQuantity',data.amount, tickersQuantity, +data.buyprice, +data.trailingstoploss);
            let buyorder = await binance.futuresBuy( data.tokenname, 50, +data.buyprice);
            console.log('roder resp', buyorder);
            if (buyorder['msg']){
                console.log('in resp', buyorder);
                res.status(400).send({message: buyorder['msg']});
                // alert(ord['msg']);
            }else{
                order['buyorderId'] = buyorder['orderId'];
                order['quantity'] = tickersQuantity;
                let sellPrice = (+data.trailingstoploss/100)*data.buyprice;
                sellPrice = data.buyprice - sellPrice;
                console.log('sell proice', sellPrice);
                let sellOrder = await binance.futuresSell( data.tokenname, 50, 0.175);
                console.log('sellOrder', sellOrder);
                if(sellOrder['orderId']){
                    console.log('out resp', sellOrder);
                    order['sellorderId'] = sellOrder['orderId'];
                    console.log('out resp', order);
                    order = await order.save();
                }
                
            }
            
          });
        //   console.log('tickersQuantity', tickersQuantity);
        // console.info( await binance.futuresMarketBuy( data.tokenname, data.amount ) );
        
    }else{
        res.redirect('/allOrders');
    }
        
    
    
}

const getUpdateOrderView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const confs = await Conf.find().exec();
        const oneorder = await Order.findById(id).exec();
        res.render('orderLayout/updateOrder', {
            order: oneorder, confs:confs
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getStatusOrderView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const oneorder = await Order.findById(id).exec();
        const conf = await Conf.findById(oneorder['confId']).exec();
        binance = new Binance().options({
            APIKEY: conf.apiKey,
            APISECRET: conf.secretKey
        });
        let status = await binance.futuresOrderStatus( oneorder['tokenname'], 
        {orderId: oneorder['buyorderId']} );
        console.log('status', status);
        res.render('orderLayout/statusOrder', {
            order: oneorder, 
            status: status, 
            confs: conf
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
        amount: data.amount,
        confId: data.confId
    }, {new: true});
    if(!order) return res.status(404).send('Order with the given id not found');

    res.redirect('/allOrders');
}

const getDeleteOrderView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const oneorder = await Order.findById(id).exec();
        res.render('orderLayout/deleteOrder', {
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
    getStatusOrderView
    // setupTrade,
    // setupTradeView
}