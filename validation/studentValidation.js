
//Validation
const Joi = require('@hapi/joi')

const studnetLoginValidation = (data) => {

    const schema = Joi.object(
        {
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required()
        }
    )

    return schema.validate(data)
}

const studnetAddSkillValidation = (data) => {

    const schema = Joi.object(
        {
            userId: Joi.string().required(),
            qualification_category: Joi.string().required(),
            qualifications:  Joi.object().required()
        }
    )

    return schema.validate(data)
}


const studnetPasswordChangeValidation = (data) => {

    const schema = Joi.object(
        {
            id: Joi.string().required(),
            currentPassword: Joi.string().required(),
            newPassword:  Joi.string().min(6).required(),
        }
    )

    return schema.validate(data)
}

module.exports.studnetLoginValidation = studnetLoginValidation
module.exports.studnetAddSkillValidation = studnetAddSkillValidation
module.exports.studnetPasswordChangeValidation = studnetPasswordChangeValidation