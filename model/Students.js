const mongoose = require('mongoose')

const studentsSchema = new mongoose.Schema({
  
    name: {
         type : String,
         required: true,
         min : 6,
         max :255
    },
    nsbm_Id:{
        type : Number,
        required: true,
    },
    acadamic_year:{
        type : Number,
        required: true,
    },
    affiliation:{
        type: String,
        required: true,
    },
    contact_no:{
        type : String,
        required: true,
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
    is_verified:{
        type: Boolean,
        default :false
    },
    created_date:{
        type: Date,
        default :Date.now
    }
});


module.exports = mongoose.model('Student' , studentsSchema)