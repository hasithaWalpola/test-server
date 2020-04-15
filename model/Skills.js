const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },
    userData:{
        type: Object,
        required: true, 
    },
    qualification_category: {
        type: String,
        required: true,
    },
    qualifications: {
        type: Object,
        required: true,
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Skills', skillSchema)