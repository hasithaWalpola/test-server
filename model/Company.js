const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({

    company_name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    company_reg_no: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,
        max: 255
    },
    contact_no:{
        type: String,
        required: true,
        max: 20
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 2
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Company', companySchema)