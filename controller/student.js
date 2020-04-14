const Students = require('../model/Students')
const {  studnetLoginValidation} = require('../validation/studentValidation')
const bycrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.studentLogin = async (req, res, next) => {
    
    // console.log(req)

    //Validation Feild
     const { error } = studnetLoginValidation(req.body)

     if (error) {
         return res.status(400).json({status: 400, message: error.details[0].message})
     }
 
     //User Check
     const studentLoginCheck = await Students.findOne({ email: req.body.email })
     
     if (!studentLoginCheck) {
         return res.status(400).json({status: 400, message: " Seems like you dont have account "})
     }
 
     //PasswordComaprison
     const validPassword = await bycrpt.compare(req.body.password, studentLoginCheck.password)
     if (!validPassword) {
         return res.status(400).json({status: 400, message: "Incorrect Password"})
     }
 
     //creating a token
     const token = jwt.sign({ _id: studentLoginCheck._id }, process.env.TOKEN_SECRET)
     res.header('auth-Token', token).send({status: 200,  success: 'true', token: token, userId: studentLoginCheck._id, message: 'Student Login Sucessfull' })
 
}