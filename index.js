const express = require('express');
const cors = require('cors');
const path = require('path');
const expressLayoutes = require('express-ejs-layouts');
const bodyParser = require('body-parser');
// const config = require('./startup/config');
// const winston = require('winston');
// const err = require('./middleware/errors');
const customerRoutes = require('./routes/customerRoutes');
const app = express();
const port = 3000;

require('./startup/db')();
require('./startup/logging')();

const Binance = require('node-binance-api');

const binance = new Binance().options({
  APIKEY: '<key>',
  APISECRET: '<secret>'
});

// require('./startup/validations')();

// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })
//   app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
//   })


app.use(expressLayoutes);
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// FOR GETTING FUTURE PRICES OF TOKENS IN BINANCE
// (async function() {
//     let x = await binance.futuresPrices()
//     let y = await 2
    
//     console.log(x, y)
//   })()



app.use(customerRoutes.routes);
// app.use(err);


app.listen(port, () => console.log('App is listening on url http://localhost:' + port));

// NEW CODE
// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })
