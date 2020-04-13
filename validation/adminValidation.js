//Validation
const Joi = require('@hapi/joi')


//Admin Creation Validation 

const adminCreateValidation = (data) => {
    const schema = Joi.object(
        {
         
            name: Joi.string().min(6).required(),
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required()

        }
    )

    return schema.validate(data)

}


//Login Validation


const adminLoginValidation = (data) => {

    const schema = Joi.object(
        {
         
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required()

        }
    )

    return schema.validate(data)

}

module.exports.adminCreateValidation = adminCreateValidation
module.exports.adminLoginValidation = adminLoginValidation
