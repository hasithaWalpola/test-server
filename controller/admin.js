const Users = require('../model/Users')

exports.getPendingStudents = async (req, res) => {

    //get all pending students
    const data = await Users.where({ type: 'Student', is_verified: false })

    try {
        // const registeredUser = await user.save();
        res.status(200).send({ success: 'true', data, message: 'Get Students Details Sucessfull' })
    } catch (err) {
        res.status(400).send({ error: err })
    }

}

exports.approvePendingStd = async (req, res) => {

    //reg_id
    // console.log(req.body.reg_id)

    //get student
    const dataStudent = await Users.findOne({ _id: req.body.reg_id })
        .then(responce => {
            // console.log(responce)
            return responce
        })
        .catch(err => {
            //  console.log(err)
            res.status(400).send({ error: 'Wrong Student Id' })
        })

    //console.log(dataStudent)

    if (dataStudent) {

        const markAsVerified = { is_verified: true };

        const done = await dataStudent.updateOne(markAsVerified);

        try {
            res.status(200).send({ success: 'true', done, message: 'Student Approved Scuessfull' })
        } catch (err) {
            res.status(400).send({ error: 'Student Approved Failed' })
        }

    }


}

exports.deletePendingStudent = async (req, res) => {

    console.log(req.body)
    //Get Student
    const dataStudent = await Users.findByIdAndRemove(req.body.reg_id)
        .then(responce => {
             console.log(responce)
            //return responce
        })
        .catch(err => {
            //  console.log(err)
            res.status(400).send({ error: 'Wrong Student Id' })
        })

    console.log(dataStudent)

    // if (dataStudent) {

    //     //const markAsVerified = { is_verified: true };

    //     await dataStudent.findByIdAndRemove(req.body.reg_id ,(res)=>{
    //         console.log(res)
    //     });

    //     // try {
    //     //     res.status(200).send({ success: 'true', done, message: 'Student Approved Scuessfull' })
    //     // } catch (err) {
    //     //     res.status(400).send({ error: 'Student Approved Failed' })
    //     // }

    // }

}