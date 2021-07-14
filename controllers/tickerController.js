const {Ticker, validate} = require('../models/ticker');

// const io = require('../index.js');

const server = require('../index.js');
var io = require('socket.io')(server.io);
const tickerSocket = require('../index.js');
// const sock = require('socket.io')(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"],
//         transports: ['websocket', 'polling'],
//         credentials: true
//     },
//     allowEIO3: true
//   });

const Binance = require('node-binance-api');

const binance = new Binance().options({
  APIKEY: '<key>',
  APISECRET: '<secret>'
});


const getAllTickers = async (req, res, next) => {

  let i=0;
  // 
  // module.exports.res = res;
    binance.futuresTickerStream( async miniTicker => {
      
      // io.emit('trick', miniTicker[0])
      tickerSocket.io.emit('new', miniTicker);
      // module.exports.tickers = miniTicker[0];
      if(i==0){
        // console.log('lenght',miniTicker);
        await res.render('tickerLayout/allTickers', {
          tickers: miniTicker
        });
        i++;
      }
      
    });
    // tickerSocket.io.emit("new", "Hey!", { "ms": "jane" }, Buffer.from([4, 3, 3, 1]));
    // console.log('this is emit', tickerSocket.io);
    // return res.render('tickerLayout/allTickers', {
    //     tickers: "miniTicker"
    // });
    let temp = io.io;
    // console.log('io is called', temp);
    // temp.on("connection",  socket => {
    //     console.log('ticker controller called');
    //     socket.send("Hello!");
    //      binance.futuresMiniTickerStream( miniTicker => {
    //       res.render('tickerLayout/allTickers', {
    //         tickers: miniTicker
    //       });
    //     });
    //     socket.emit("greetings", "Hey!", { "ms": "jane" }, Buffer.from([4, 3, 3, 1]));
    //     socket.on("message", (data) => {
    //       console.log(data);
    //     });
    //     socket.on("salutations", (elem1, elem2, elem3) => {
    //       console.log(elem1, elem2, elem3);
    //     });
    // });
        
}


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