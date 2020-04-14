const Students = require('../model/Students')

exports.getPendingStudents = async (req, res) => {

    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    console.log(page, 'Page', limit, 'Limit')

    const startIndex = (page - 1) * limit
    const endIndex = page * limit



    //get all pending students
    //const data = await Students.where({ type: 'student', is_verified: false })

    const results = {}

    const pageCount = await Students.countDocuments().exec() / limit

    results.pageCount = Math.ceil(pageCount)

    if (endIndex < await Students.countDocuments().exec()) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndex > 0) {

        results.previous = {
            page: page - 1,
            limit: limit
        }
    }

    
        results.results = await Students.find().limit(limit).skip(startIndex).exec()
   
    


    try {
        // const registeredUser = await user.save();
        res.status(200).send({ success: 'true', results, message: 'Get Students Details Sucessfull' })
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
            res.status(200).send({ success: 'true', responce, message: 'Delete Sucessfull!' })
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