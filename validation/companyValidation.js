//Validation
const Joi = require('@hapi/joi')


//Company Registration  Validation 

const companyRegistrationValidation = (data) => {
    const schema = Joi.object(
        {
         
            company_name: Joi.string().min(6).required(),
            company_reg_no: Joi.number().required(),
            country: Joi.string().min(6).required(),
            contact_no: Joi.string().min(6).required(),
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required()

        }
    )

    return schema.validate(data)

}

const companyLoginValidation = (data) => {
    const schema = Joi.object(
        {
         
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required()

        }
    )

    return schema.validate(data)

}



module.exports.companyRegistrationValidation = companyRegistrationValidation
module.exports.companyLoginValidation = companyLoginValidation

