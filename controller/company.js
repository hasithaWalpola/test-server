const Company = require('../model/Company')
const { companyRegistrationValidation } = require('../validation/companyValidation')
const bycrpt = require('bcryptjs')


exports.registerCompany = async (req, res) => {
   
    console.log(req.body)

    //Validation
    const { error } = companyRegistrationValidation(req.body)


    if (error) {
        return  res.status(400).json({ status: 400,  message:  error.details[0].message  })
    }

    //check user exist
    const emailCheck = await Company.findOne({ email: req.body.email })

    if (emailCheck) {
        return res.status(400).json({status: 400, message: 'Email Already Exixts' })
    }

    //Hash the password
    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(req.body.password, salt)

    const company = new Company({
        company_name: req.body.company_name,
        company_reg_no: req.body.company_reg_no,
        country: req.body.country,
        contact_no: req.body.contact_no,
        email: req.body.email,
        password: hashedPassword
    });

    // console.log('here', user)

    try {
        const registeredCompany = await company.save();
        res.status(201).json({ status: 201, success: 'true', registeredCompany, message: 'Member Registration Sucessfull' })
    } catch (err) {
        res.status(400).json({ status: 400,error: err })
    }

}