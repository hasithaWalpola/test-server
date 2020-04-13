const router = require('express').Router();

//Controllers
const authController = require('../controller/auth')
const adminController = require('../controller/admin')

const isAuth = require('../middleware/isAuth')


router.post('/createAdmin' , authController.cerateAdmin)
router.post('/loginAdmin' , authController.adminLogin)

router.post('/register', authController.register)
router.post('/login' , authController.login)
router.post('/approveStudent' , adminController.approvePendingStd )


router.get('/getPendingStudents' , adminController.getPendingStudents)



router.delete('/deletePendingStudent' , adminController.deletePendingStudent)

router.get('/post' ,isAuth ,(req, res)=>{
    res.json({
        posts:{
            title : 'first post'
        }
    })
})

module.exports = router