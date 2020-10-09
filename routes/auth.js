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
router.post('/approveStudent' ,  isAuth, adminController.approvePendingStd)
router.post('/approveCompany' ,  isAuth, adminController.approvePendingCompany)
router.get('/getPendingStudents' , isAuth, adminController.getPendingStudents)
router.get('/getPendingCompany' , isAuth, adminController.getPendingCompanies)
router.delete('/deletePendingStudent'  , isAuth, adminController.deletePendingStudent)
router.delete('/deletePendingCompany' ,  isAuth, adminController.deletePendingCompany)

//COMPANY
router.post('/registerAsCompany' ,companyController.registerCompany)
router.post('/loginAsCompany' ,companyController.companyLogin)
router.get('/companyDetails' , isAuth, companyController.getOwnCompanyDetails)
router.get('/studentBySkill' , isAuth, companyController.getSkillByCategory)


//Student
router.post('/registerAsStudnent', authController.registerAsStudent)
router.post('/loginAsStudent', studentController.studentLogin )
router.post('/addSkill' ,isAuth ,  studentController.addQualification)
router.get('/studentDetail' , isAuth, studentController.getOwnStudentDetails)
router.get('/skillByStudentId' , isAuth, studentController.getSkillByStudentId)
router.post('/changePassword' , studentController.changePassword)
router.post('/login' , authController.login)
router.post('/registerCustomer', authController.registerCustomer)






router.get('/post' ,isAuth ,(req, res)=>{
    res.json({
        posts:{
            title : 'first post'
        }
    })
})

module.exports = router