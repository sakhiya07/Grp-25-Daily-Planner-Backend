const mongoose =  require('mongoose');
const { Schema } = mongoose;

const monthlySchema = new Schema({
    email:{
        type:String,
    },
    date:{
        type:String,
    },
    todo:[{
        type:String
    }],
    birthday:[{
        type:String
    }],
    goal:[{
        type:String
    }],
    notes:[{
        type:String
    }],
    shopping:[{
        type:String
    }],
    important:[{
        type:String
    }],
    monthlyMotto: {
        type: String
    }
});

const monthly = mongoose.model('monthly',monthlySchema);

module.exports = monthly;