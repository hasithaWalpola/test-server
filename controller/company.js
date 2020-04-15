const Company = require('../model/Company')
const Students = require('../model/Students')
const Skills = require('../model/Skills')
const { companyRegistrationValidation, companyLoginValidation } = require('../validation/companyValidation')
const bycrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.registerCompany = async (req, res) => {

    console.log(req.body)

    //Validation
    const { error } = companyRegistrationValidation(req.body)


    if (error) {
        return res.status(400).json({ status: 400, message: error.details[0].message })
    }

    //check user exist
    const emailCheck = await Company.findOne({ email: req.body.email })

    if (emailCheck) {
        return res.status(400).json({ status: 400, message: 'Email Already Exixts' })
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
        res.status(400).json({ status: 400, error: err })
    }

}

exports.companyLogin = async (req, res, next) => {

    // console.log(req)

    //Validation Feild
    const { error } = companyLoginValidation(req.body)

    if (error) {
        return res.status(400).json({ status: 400, message: error.details[0].message })
    }

    //User Check
    const companyLoginCheck = await Company.findOne({ email: req.body.email })
    if (!companyLoginCheck) {
        return res.status(400).json({ status: 400, message: " Seems like you dont have account " })
    }

    //PasswordComaprison
    const validPassword = await bycrpt.compare(req.body.password, companyLoginCheck.password)
    if (!validPassword) {
        return res.status(400).json({ status: 400, message: "Incorrect Password" })
    }

    //creating a token
    const token = jwt.sign({ _id: companyLoginCheck._id }, process.env.TOKEN_SECRET)
    res.header('auth-Token', token).send({ status: 200, success: 'true', token: token, userId: companyLoginCheck._id, message: 'Company Login Sucessfull' })

}

exports.getOwnCompanyDetails = async (req, res, next) => {

    const id = req.query.id
    console.log(id)
    //check user exist
    try {

        const companyDetails = {}

        const fetchResults = await Company.findOne({ _id: id })

        if (!fetchResults) {
            return res.status(400).json({ status: 400, message: "Couldnt Find Your Company Detatils" })
        } else {
            companyDetails.id = fetchResults._id
            companyDetails.is_verified = fetchResults.is_verified
            companyDetails.company_name = fetchResults.company_name
            companyDetails.company_reg_no = fetchResults.company_reg_no
            companyDetails.country = fetchResults.country
            companyDetails.contact_no = fetchResults.contact_no
            companyDetails.email = fetchResults.email

            res.status(201).json({ status: 200, success: 'true', companyDetails, message: 'Get Comapany Details Scuessfull' })
        }
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Couldnt Find Your Company Detatils" })
    }

}


exports.getSkillByCategory = async (req, res, next) => {

    if (req.query.qualification_category) {
        console.log('Query Have')

        const catergory = req.query.qualification_category

        console.log(catergory)

        try {

            const students = {}

            const fetchResults = await Skills.find({ qualification_category: catergory })

            if (!fetchResults) {
                return res.status(400).json({ status: 400, message: "Couldnt Find Your Company Detatils" })
            } else {

                res.status(201).json({ status: 200, success: 'true', fetchResults, message: 'Get Student By Skill Scuessfull' })
            }
        } catch (e) {
            return res.status(400).json({ status: 400, message: "Couldnt Find Your Students with skill" })
        }

    } else {
        console.log('No Query Found')
        

        try {

            const students = {}

            const fetchResults = await Skills.find({ })

            if (!fetchResults) {
                return res.status(400).json({ status: 400, message: "No Skills Find " })
            } else {

                res.status(201).json({ status: 200, success: 'true', fetchResults, message: 'Get SkillS Scuessfull' })
            }
        } catch (e) {
            return res.status(400).json({ status: 400, message: "Couldnt Find Skills" })
        }

    }



}