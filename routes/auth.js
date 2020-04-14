const router = require('express').Router();

//Controllers
const authController = require('../controller/auth')
const adminController = require('../controller/admin')
const companyController = require('../controller/company')
const studentController = require('../controller/student')

//Middleware
const isAuth = require('../middleware/isAuth')


//ADMIN
router.post('/createAdmin' , authController.cerateAdmin)
router.post('/loginAdmin' , authController.adminLogin)
router.post('/approveStudent' , adminController.approvePendingStd)
router.post('/approveCompany' , adminController.approvePendingCompany)
router.get('/getPendingStudents' , adminController.getPendingStudents)
router.get('/getPendingCompany' , adminController.getPendingCompanies)
router.delete('/deletePendingStudent' , adminController.deletePendingStudent)
router.delete('/deletePendingCompany' , adminController.deletePendingCompany)

//COMPANY
router.post('/registerAsCompany' ,companyController.registerCompany)
router.post('/loginAsCompany' ,companyController.companyLogin)
router.get('/companyDetails' ,companyController.getOwnCompanyDetails)


//Student
router.post('/registerAsStudnent', authController.registerAsStudent)
router.post('/loginAsStudent', studentController.studentLogin )
router.post('/login' , authController.login)





router.get('/post' ,isAuth ,(req, res)=>{
    res.json({
        posts:{
            title : 'first post'
        }
    })
})

module.exports = router