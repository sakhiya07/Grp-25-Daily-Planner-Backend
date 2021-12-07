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
    thoughts:[{
        type:String
    }],
    highlights:[{
        type:String
    }],
    greatful:[{
        type:String
    }],
    notes:[{
        type:String
    }],
    rate: [{
        type:Number
    }],
    
    dailyAffirmation: {
        type: String
    },
    madeBetterToday: {
        type: String
    },
});

const daily = mongoose.model('daily',dailySchema);

module.exports = daily;