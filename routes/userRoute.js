
const express = require('express')
const { body } = require('express-validator')
const authController = require('../controllers/authController')
const authMiddleware = require("../middlewares/authMiddleware")
const router = express.Router()
const User = require("../models/User")

router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('Please enter your name'),



        body('email').isEmail().not().isEmpty().withMessage('Please enter valid Email')
            .custom((userEmail) => {
                return User.findOne({ "email": userEmail }).then((user) => {
                    if (user) {
                        return Promise.reject('Email already exists')
                    }
                })

            }),
        body('password').not().isEmpty().withMessage('Please enter your password')

    ],

    authController.createUser)
router.route('/login').post(authController.loginUser)
router.route('/logout').get(authController.logoutUser)
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage)
router.route('/:id').delete(authController.deleteUser)

module.exports = router;