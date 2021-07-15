const express = require('express');
const {getAllTickers, 
    // getAddOrderView, addOrder,
    //     getUpdateOrderView, updateOrder, getDeleteOrderView, deleteOrder, 
        // setupTrade, setupTradeView
        } = require('../controllers/tickerController');


const router = express.Router();

router.get('/', getAllTickers);
// router.get('/addOrder', getAddOrderView);
// router.post('/addOrder', addOrder);
// router.get('/updateOrder/:id', getUpdateOrderView);
// router.post('/updateOrder/:id', updateOrder);
// router.get('/deleteOrder/:id', getDeleteOrderView);
// router.post('/deleteOrder/:id', deleteOrder);
// router.get('/setupTrade', setupTradeView);
// router.post('/setupTrade', setupTrade);


module.exports = {
    routes: router
}