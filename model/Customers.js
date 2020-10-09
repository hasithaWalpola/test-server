const mongoose = require('mongoose')

const customersSchema = new mongoose.Schema({
  
    first_name: {
         type : String,
         required: true,
         min : 6,
         max :255
    },
    first_name: {
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
    mobile: {
        type : String,
        required: true,
        min : 6,
        max :255
   },
});


module.exports = mongoose.model('customers' , customersSchema)