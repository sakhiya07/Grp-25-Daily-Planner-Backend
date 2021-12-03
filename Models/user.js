const mongoose =  require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    email: {
        type:String,
        required:true,
        lowercase: true,
        trim:true
    },
    password: {
        type:String,
        required:true,
        trim:true
    },
    picURL: {
        type:String,
        trim:true
    },
});

const User = mongoose.model('User',userSchema);

module.exports = User;