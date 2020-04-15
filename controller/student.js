const Students = require('../model/Students')
const Skills = require('../model/Skills')
const { studnetLoginValidation, studnetAddSkillValidation } = require('../validation/studentValidation')
const bycrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.studentLogin = async (req, res, next) => {

    // console.log(req)

    //Validation Feild
    const { error } = studnetLoginValidation(req.body)

    if (error) {
        return res.status(400).json({ status: 400, message: error.details[0].message })
    }

    //User Check
    const studentLoginCheck = await Students.findOne({ email: req.body.email })

    if (!studentLoginCheck) {
        return res.status(400).json({ status: 400, message: " Seems like you dont have account " })
    }

    //PasswordComaprison
    const validPassword = await bycrpt.compare(req.body.password, studentLoginCheck.password)
    if (!validPassword) {
        return res.status(400).json({ status: 400, message: "Incorrect Password" })
    }

    //creating a token
    const token = jwt.sign({ _id: studentLoginCheck._id }, process.env.TOKEN_SECRET)
    res.header('auth-Token', token).send({ status: 200, success: 'true', token: token, userId: studentLoginCheck._id, message: 'Student Login Sucessfull' })

}

exports.getOwnStudentDetails = async (req, res, next) => {

    const id = req.query.id
    console.log(id)
    //check user exist
    try {

        const studentDetails = {}

        const fetchResults = await Students.findOne({ _id: id })

        if (!fetchResults) {
            return res.status(400).json({ status: 400, message: "Couldnt Find Your Company Detatils" })
        } else {
            studentDetails.id = fetchResults._id
            studentDetails.is_verified = fetchResults.is_verified
            studentDetails.name = fetchResults.name
            studentDetails.nsbm_Id = fetchResults.nsbm_Id
            studentDetails.acadamic_year = fetchResults.acadamic_year
            studentDetails.affiliation = fetchResults.affiliation
            studentDetails.contact_no = fetchResults.contact_no
            studentDetails.email = fetchResults.email

            res.status(201).json({ status: 200, success: 'true', studentDetails, message: 'Get Comapany Details Scuessfull' })
        }
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Couldnt Find Your Company Detatils" })
    }

}


exports.addQualification = async (req, res, next) => {

    //Validation Feild
    const { error } = studnetAddSkillValidation(req.body)

    if (error) {
        return res.status(400).json({ status: 400, message: error.details[0].message })
    }

    const studnetObjModified = {}

    //Get Student Object Check
    const studentObject = await Students.findOne({ _id: req.body.userId })
    
    studnetObjModified.id = studentObject._id
    studnetObjModified.nsbm_Id = studentObject.nsbm_Id
    studnetObjModified.nsbm_Id = studentObject.nsbm_Id
    studnetObjModified.acadamic_year = studentObject.acadamic_year
    studnetObjModified.affiliation = studentObject.affiliation
    studnetObjModified.contact_no = studentObject.contact_no
    studnetObjModified.email = studentObject.email

    const skill = new Skills(
        {
            userId: req.body.userId,
            userData: studnetObjModified,
            qualification_category: req.body.qualification_category,
            qualifications: req.body.qualifications,

        });

    console.log('here', skill)

    try {
        const addedSkill = await skill.save();

        res.status(200).send({ success: 'true', addedSkill, message: 'Studnet Registration Sucessfull' })
    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }



}


exports.getSkillByStudentId= async (req, res, next) => {


        console.log('Query Have')

        const id = req.query.id

        console.log(id)

        try {

            const students = {}

            const studentSkill = await Skills.find({ userId: id })

            if (!studentSkill) {
                return res.status(400).json({ status: 400, message: "Couldnt Find Your Company Detatils" })
            } else {

                res.status(201).json({ status: 200, success: 'true', studentSkill, message: 'Get Skill By Student Id Scuessfull' })
            }
        } catch (e) {
            return res.status(400).json({ status: 400, message: "Couldnt Find Skill Fot Student Id" })
        }

    



}