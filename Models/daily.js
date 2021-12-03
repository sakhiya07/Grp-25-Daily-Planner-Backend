const mongoose =  require('mongoose');
const { Schema } = mongoose;

const dailySchema = new Schema({
    email:{
        type:String,
    },
    date:{
        type:String,
    },
    work:[{
        type:String
    }],
    family:[{
        type:String
    }],
    selfcare:[{
        type:String
    }],
    notes:[{
        type:String
    }],
    workRate:{
        type:Number
    },
    familyRate:{
        type:Number
    },
    selfcareRate:{
        type:Number
    },  

});

const daily = mongoose.model('daily',dailySchema);

module.exports = daily;