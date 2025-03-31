const express = require('express')
const registerUser = require('../controller/registerUser')
const userDetails = require('../controller/userDetails')
const logout = require('../controller/logout')
const searchUser = require('../controller/searchUser')
const login = require('../controller/login')

const router = express.Router()

//create user api
router.post('/register',registerUser)

//login user details
router.get('/user-details',userDetails)
//logout user
router.get('/logout',logout)
//search user
router.post("/search-user",searchUser)
//login user
router.post("/login",login)


module.exports = router