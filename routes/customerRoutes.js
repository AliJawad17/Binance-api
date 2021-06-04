const express = require('express');
const {getAllCustomers, getAddCustomerView, addCustomer,
        getUpdateCustomerView, updateCustomer, getDeleteCustomerView, deleteCustomer, 
        // setupTrade, setupTradeView
        } = require('../controllers/customerController');


const router = express.Router();

router.get('/', getAllCustomers);
router.get('/addCustomer', getAddCustomerView);
router.post('/addCustomer', addCustomer);
router.get('/updateCustomer/:id', getUpdateCustomerView);
router.post('/updateCustomer/:id', updateCustomer);
router.get('/deleteCustomer/:id', getDeleteCustomerView);
router.post('/deleteCustomer/:id', deleteCustomer);
// router.get('/setupTrade', setupTradeView);
// router.post('/setupTrade', setupTrade);


module.exports = {
    routes: router
}