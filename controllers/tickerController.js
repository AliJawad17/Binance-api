const {Ticker, validate} = require('../models/ticker');
// const io = require('socket.io')(80);
// const cfg = require('./config.json');
// const tw = require('node-binance-api')(cfg);
// tw.track('socket.io');
// tw.track('javascript');
// tw.on('tweet', (tweet) => {
//   io.emit('tweet', tweet);
// });
const Binance = require('node-binance-api');

const binance = new Binance().options({
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

const getAllTickers = async (req, res, next) => {
    // console.info( await binance.futuresPrices() );
    // console.info( await binance.futuresAccount() );
    // binance.futuresMiniTickerStream( 'BTCUSDT', console.log );
    // binance.futuresBookTickerStream( console.log );
    let list = [], i=0;
     await binance.futuresMiniTickerStream( miniTicker => {
         if (i==10){
            console.log('100 occurred');
            i=0;
         }
         if(i==0 || i==10){
            //  console.log(miniTicker)
            res.render('tickerLayout/allTickers', {
                tickers: miniTicker
            });
            // next();
            i++;
         }else{
            i++;
            console.log('100 not occurred', i);
         }
        list = miniTicker;
    });
    // const list = await Ticker.find().exec();
}

// const getAddOrderView = (req, res, next) => {
//     res.render('orderLayout/addOrder');
// }

// // const setupTradeView = (req, res, next) => {
// //     res.render('setupTrade');
// // }

// const addOrder = async (req, res, next) => {
//     // const {error} = validate(req.body);
//     // if(error) return res.status(422).send(error.details[0].message);
//     const data = req.body;
//     let order = await new Order({
//         tokenname: data.tokenname,
//         buyprice: data.buyprice,
//         stoploss: data.stoploss,
//         // cnic: data.cnic,
//         // address: data.address
//     });
//     order = await order.save();
//     res.redirect('/allOrders');
// }

// const getUpdateOrderView = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const oneorder = await Order.findById(id).exec();
//         res.render('orderLayout/updateOrder', {
//             order: oneorder
//         });
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const updateOrder = async(req, res, next) => {
//     // const {error} = validate(req.body);
//     // if (error) return res.status(422).send(error.details[0].message);
//     const id = req.params.id;
//     const data = req.body;
//     let order = await Order.findByIdAndUpdate(id, {
//         tokenname: data.tokenname,
//         buyprice: data.buyprice,
//         stoploss: data.stoploss,
//         // cnic: data.cnic,
//         // address: data.address
//     }, {new: true});
//     if(!order) return res.status(404).send('Order with the given id not found');

//     res.redirect('/allOrders');
// }

// const getDeleteOrderView = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const oneorder = await Order.findById(id).exec();
//         res.render('orderLayout/deleteOrder', {
//             order: oneorder
//         });
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const deleteOrder = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const order = await Order.findByIdAndRemove(id);
//         if(!order) return res.status(404).send('Order with the given id not found');
//         res.redirect('/allOrders');        
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }


module.exports = {
    getAllTickers,
    // getAddOrderView,
    // addOrder,
    // getUpdateOrderView,
    // updateOrder,
    // getDeleteOrderView,
    // deleteOrder,
    // setupTrade,
    // setupTradeView
}