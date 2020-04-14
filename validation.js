//Validation
const Joi = require('@hapi/joi')


//Register Validation 

const studentRegistrationValidation = (data) => {
    const schema = Joi.object(
        {
         
            name: Joi.string().min(6).required(),
            nsbm_Id : Joi.string().min(6).required(),
            acadamic_year : Joi.number().required(),
            affiliation: Joi.string().required(),
            contact_no: Joi.string().required(),
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required()

        }
    )

    return schema.validate(data)

}

const loginValidation = (data) => {

    const schema = Joi.object(
        {
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required()
        }
    )

    return schema.validate(data)
}

module.exports.studentRegistrationValidation = studentRegistrationValidation
module.exports.loginValidation = loginValidation

