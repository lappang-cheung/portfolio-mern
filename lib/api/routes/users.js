// Required classes
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

// Loading custom class
const config = require('../config/config')

// Loading the models
const User = require('../model/User')

// Loading validations
const validateRegisterInput = require('../validations/users/register')
const validateLoginInput = require('../validations/users/login')

/*
 * @route   GET api/users/test
 * @desc    Test user route
 * @access  Public
 */
router.get('/test', async(req, res, next) => {
    try{
        const docs = await { message: 'Able to connect User model'}
        res.status(200).send(docs)
    }catch(e){
        next(e)
    }
})

/*
 * @route   POST api/users/register
 * @desc    Register user route
 * @access  Public
 */
router.post('/register', async(req, res, next) => {

    const {errors, isValid } = validateRegisterInput(req.body);
    //  Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    try{
        const user = await User.findOne({ email: req.body.email})
        // Check for existing email
        if(user){
            return res.status(400).json({ email: 'Email already exists'})
        }else{
            // Create new user
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                avatar: req.body.avatar,
                password: req.body.password
            })
            // Encrypt using bcrypt
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err
                    newUser.password = hash
                    // Save the user
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    }catch(e){
        next(e)
    }
})

/*
 * @route   POST api/users/login
 * @desc    Login user route
 * @access  Public
 */
router.post('/login', async(req,res,next) => {

    const {errors, isValid } = validateLoginInput(req.body);
    //  Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    const {email, password} = req.body
    try{
        // Check user
        const user = await User.findOne({ email })
        if(!user){
            return res.status(404).json({ email: 'User not found' })
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            // User matched
            const payload = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar,
                email: user.email
            } // JWT payload

            // Sign Token
            jwt.sign(
                payload, 
                config.secretOrKey, 
                { expiresIn: 60 * 60 }, 
                (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    })
                }
            )
        }else{
            res.status(400).json({ password: 'Password incorrect' })
        }

    }catch(e){
        next(e)
    }
})

/*
 * @route   POST api/users/current_user
 * @desc    Return current user
 * @access  Private
 */

 router.get('/current', passport.authenticate('jwt', {session: false}), async(req, res, next) => {
    try{
        const docs = await {
            id: req.user.id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            avatar: req.user.avatar,
            email: req.user.email
        }
        res.status(200).json(docs)
    }catch(e){
        next(e)
    }
 })
module.exports = router