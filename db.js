require("dotenv").config();
const mongoose = require('mongoose');

const db = async() =>
{
    try{
        const dbconnection = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connection established : ${dbconnection.connection.host}`);
    }catch(err){
        console.error(err);
        process.exit(1);
    }
};

module.exports = db;