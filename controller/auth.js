const Students = require('../model/Students')
const Admin = require('../model/Admin')
const { studentRegistrationValidation, loginValidation, customerRegistrationValidation } = require('../validation')
const { adminCreateValidation, adminLoginValidation } = require('../validation/adminValidation')
const bycrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Customers = require('../model/Customers')



exports.cerateAdmin = async (req, res) => {

    //Validation
    const { error } = adminCreateValidation(req.body)

    if (error) {
        return res.status(400).send({ error: error.details[0].message })
    }


    //check Admin exist
    const emailCheck = await Admin.findOne({ email: req.body.email })

    if (emailCheck) {
        return res.status(400).send({ error: 'Email Already Exixts' })
    }

    //Hash the password
    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(req.body.password, salt)

    const admin = new Admin({

        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    console.log('here', admin)

    try {
        const registeredAdmin = await admin.save();
        res.status(200).send({ success: 'true', registeredAdmin, message: 'Admin Registration Sucessfull' })
    } catch (err) {
        res.status(400).send({ error: err })
    }

}



exports.registerAsStudent = async (req, res) => {
    //Validation
    const { error } = studentRegistrationValidation(req.body)


    if (error) {
        return res.status(400).json({ status: 400, message: error.details[0].message })
    }

    //check user exist
    const emailCheck = await Students.findOne({ email: req.body.email })

    if (emailCheck) {
        return res.status(400).send({ status: 400, message: 'Email Already Exixts' })
    }

    //Hash the password
    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(req.body.password, salt)

    const student = new Students({
        name: req.body.name,
        nsbm_Id: req.body.nsbm_Id,
        acadamic_year: req.body.acadamic_year,
        affiliation: req.body.affiliation,
        contact_no: req.body.contact_no,
        email: req.body.email,
        password: hashedPassword
    });

    console.log('here', student)

    try {
        const registeredStudent = await student.save();

        res.status(200).send({ success: 'true', registeredStudent, message: 'Studnet Registration Sucessfull' })
    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }

}

exports.adminLogin = async (req, res, next) => {

    // console.log(req)
    //Validation Feils
    const { error } = adminLoginValidation(req.body)
    if (error) {
        return res.status(400).json({ status: 400, message: error.details[0].message })
    }

    //User Check
    const adminCheck = await Admin.findOne({ email: req.body.email })
    if (!adminCheck) {
        return res.status(400).json({ status: 400, message: " Seems like you dont have account " })
    }

    //PasswordComaprison
    const validPassword = await bycrpt.compare(req.body.password, adminCheck.password)
    if (!validPassword) {
        return res.status(400).json({ status: 400, message: "Incorrect Password" })
    }

    //creating a token
    const token = jwt.sign({ _id: adminCheck._id }, process.env.TOKEN_SECRET)
    res.header('auth-Token', token).send({ success: 'true', token: token, userId: adminCheck._id, message: 'Admin Login Sucessfull' })
}



exports.login = async (req, res, next) => {
    //Validation Feils
    const { error } = loginValidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    //User Check
    const userCheck = await Users.findOne({ email: req.body.email })
    if (!userCheck) {
        return res.status(400).send({ error: 'Seems like you dont have account' })
    }

    //PasswordComaprison
    const validPassword = await bycrpt.compare(req.body.password, userCheck.password)
    if (!validPassword) {
        return res.status(400).send({ error: 'Incorrect Password' })
    }


    //creating a token
    const token = jwt.sign({ _id: userCheck._id }, process.env.TOKEN_SECRET)
    res.header('auth-Token', token).send({ success: 'true', token: token, userId: userCheck._id, message: 'Member Login Sucessfull' })
}


exports.registerCustomer = async (req, res) => {
    //Validation
   // console.log('here customer', req)
    const { error } = customerRegistrationValidation(req.body)
    console.log('error', error)
    //console.log('here customer', customer)
    if (error) {
        return res.status(400).json({ status: 400, message: error.details[0].message })
    }

    //check user exist
    const emailCheck = await Customers.findOne({ email: req.body.email })

    if (emailCheck) {
        return res.status(400).send({ status: 400, message: 'Email Already Exixts' })
    }

    //Hash the password
    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(req.body.password, salt)

    const customer = new Customers({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
    });

    console.log('here', customer)

    try {
        const registerdCustomer = await customer.save();

        res.status(200).send({ success: 'true', registerdCustomer, message: 'Studnet Registration Sucessfull' })
    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }

}
