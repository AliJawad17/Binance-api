const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
    
    // mongoose.connect('mongodb://localhost/customerDatabase', {
    mongoose.connect('mongodb+srv://mongodbatlas:mongodbatlas@cluster0.tf368.mongodb.net/reviewapp1?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    }).then(() => winston.info('MongoDb connected successfuly...'));
}