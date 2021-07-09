const express = require('express');
const {
    getAllConfs, getUpdateConfView, updateConf, getDeleteConfView, deleteConf, 
        addConf, addConfView, getAvailableBalance} = 
        require('../controllers/confController');


const router = express.Router();

router.get('/allConfs', getAllConfs);
router.put('/getAvailableBalance', getAvailableBalance);
// router.post('/addCustomer', addCustomer);
router.get('/updateConf/:id', getUpdateConfView);
router.post('/updateConf/:id', updateConf);
router.get('/deleteConf/:id', getDeleteConfView);
router.post('/deleteConf/:id', deleteConf);
router.get('/addConf', addConfView);
router.post('/addConf', addConf);


module.exports = {
    routes: router
}