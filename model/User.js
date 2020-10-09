const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type : String,
        required: true,
        max : 255,
        min : 2
    },
    password :{
        type : String,
        required: true,
        max : 1024,
        min : 6
    },
});


module.exports = mongoose.model('user' , userSchema)
