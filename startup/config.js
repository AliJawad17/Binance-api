const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {PORT, HOST, HOST_URL} = process.env;
// const apiKey, secretKey, margin, leverage, balanceBufer;

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    // apiKey: apiKey, 
    // secretKey: secretKey,
    // margin: margin,
    // leverage: leverage,
    // balanceBufer: balanceBufer
}