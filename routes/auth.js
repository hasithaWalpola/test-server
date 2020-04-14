const router = require('express').Router();

//Controllers
const authController = require('../controller/auth')
const adminController = require('../controller/admin')
const companyController = require('../controller/company')

//Middleware
const isAuth = require('../middleware/isAuth')


//ADMIN
router.post('/createAdmin' , authController.cerateAdmin)
router.post('/loginAdmin' , authController.adminLogin)
router.post('/approveStudent' , adminController.approvePendingStd)
router.get('/getPendingStudents' , adminController.getPendingStudents)
router.delete('/deletePendingStudent' , adminController.deletePendingStudent)

//COMPANY
router.post('/registerAsCompany' ,companyController.registerCompany)

router.post('/register', authController.register)
router.post('/login' , authController.login)





router.get('/post' ,isAuth ,(req, res)=>{
    res.json({
        posts:{
            title : 'first post'
        }
    })
})

module.exports = router