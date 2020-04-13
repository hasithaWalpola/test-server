const router = require('express').Router();

//Controllers
const authController = require('../controller/auth')
const adminController = require('../controller/admin')

//Middleware
const isAuth = require('../middleware/isAuth')



// //Swagger
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
 
// router.use('/api-docs', swaggerUi.serve);
// router.get('/api-docs', swaggerUi.setup(swaggerDocument));



//ADMIN
router.post('/createAdmin' , authController.cerateAdmin)
router.post('/loginAdmin' , authController.adminLogin)
router.post('/approveStudent' , adminController.approvePendingStd)
router.get('/getPendingStudents' , adminController.getPendingStudents)
router.delete('/deletePendingStudent' , adminController.deletePendingStudent)



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