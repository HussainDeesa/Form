const mongoose = require('mongoose')
require('dotenv').config();
const username = encodeURIComponent(process.env.REACT_APP_MONGO_USERNAME);
const password = encodeURIComponent(process.env.REACT_APP_MONGO_PASSWORD);
const mongoURi=`mongodb+srv://${username}:${password}@cluster0.qv5zj.mongodb.net/CNote?retryWrites=true&w=majority`
const connectToMongo = () => {
    mongoose.connect(mongoURi, {
    }).then(() => {
        console.log('connected to mongo successfully');
    }).catch((e) => {
        console.log(e, 'not connected');
    });
}
module.exports = connectToMongo

