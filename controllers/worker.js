const { Worker, isMainThread, workerData, parentPort  } = require('worker_threads');
const tickerSocket = require('../index.js');
const {Order, validate} = require('../models/order');
const {Conf} = require('../models/conf');
const Binance = require('node-binance-api');

binance = new Binance().options({
  APIKEY: '<key>',
  APISECRET: '<secret>'
});
// parentPort.postMessage({ welcome: workerData })
if (isMainThread) {
    const worker = new Worker(__filename, {workerData: order});
    worker.once('message', (result) => {
    console.log('square of 5 is :', result);
})
} else {
    
    // parentPort.postMessage(workerData.num * workerData.num);
    // let selector = order._id;
    // tickerSocket.io.emit('allOrder', 800);
    let newOrder = workerData;
    console.log('in worker.js', newOrder);
    binance.futuresTickerStream( newOrder.tokenname, async (stream) =>{
        
        let status = await binance.futuresOrderStatus( newOrder.tokenname, 
            {orderId: newOrder.buyorderId} );
        console.log('status', status['status']);
        if (stream['close'] > newOrder['currentprice'] && status['status'] == 'FILLED'){
            console.log('if stream value', stream['close'], newOrder['currentprice']);
            let sellprice = (+newOrder.trailingstoploss/100)*stream['close'];
            sellprice = stream['close'] - sellprice;
            newOrder = await Order.findByIdAndUpdate(newOrder._id, {
                tokenname: newOrder.tokenname,
                buyprice: newOrder.buyprice,
                sellprice: sellprice,
                trailingstoploss: newOrder.trailingstoploss,
                amount: newOrder.amount,
                confId: newOrder.confId,
                buyorderId: newOrder.buyorderId,
                quantity: newOrder.quantity,
                currentprice: stream['close']
            }, {new: true});
        }else if(stream['close'] <= newOrder.sellprice) {
            console.log('else if stream value', stream['close'], newOrder['currentprice']);
            let conf = await Conf.findById({_id: newOrder.confId}).exec();//, async (resp) => {
            binance = new Binance().options({
                APIKEY: conf.apiKey,
                APISECRET: conf.secretKey
            });
            let sellOrder = await binance.futuresMarketSell( newOrder.tokenname, newOrder.quantity);
            // parentPort.postMessage({ welcome: sellOrder })
        }else {
            console.log('else stream value', stream['close'], newOrder['currentprice']);
        }
    });
}
