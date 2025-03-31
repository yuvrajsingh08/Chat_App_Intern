const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function login(request, response) {
  try {
    const { email, phone } = request.body;

    // const login = await UserModel.findOne({ email:email, password:hashpassword });
    const user = await UserModel.findOne({ email });
    console.log(user)
    if(user) {
        if(phone !== user.phone) {
          return response.status(400).json({
            message: "phone number and email are not correct",
            error: true,
          });
        }
    }
    if (!user) {
        return response.status(400).json({
            message: "User not exit",
            error: true,
        });
    }

   const tokenData = {
     id: user._id,
     email: user.email,
   };
   const token = await jwt.sign(tokenData, process.env.JWT_SECREAT_KEY, {
     expiresIn: "1d",
   });

   const cookieOptions = {
     http: true,
     secure: true,
     sameSite: "None", // or 'Strict' or 'None'
     maxAge: 24 * 60 * 60 * 1000, // 1 day
   };

   return response.cookie("token", token, cookieOptions).status(200).json({
     message: "Login successfully",
     domain: '.onrender.com',
     path: '/',
     token: token,
     data: user,
     success: true,
   });



  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = login;
