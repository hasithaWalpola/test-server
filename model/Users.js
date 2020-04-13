const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    national_Id:{
        type : String,
        min : 6,
        required: true,
    },
    name: {
         type : String,
         required: true,
         min : 6,
         max :255
    },
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
    profession:{
        type : String,
        required: true,
    },
    affiliation:{
        type: String,
    },
    type:{
        type : String,
        required: true,
    },
    is_verified:{
        type: Boolean,
        default :false
    },
    created_date:{
        type: Date,
        default :Date.now
    }
});


module.exports = mongoose.model('Users' , usersSchema)