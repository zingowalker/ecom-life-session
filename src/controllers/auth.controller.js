// sign up a new user
import User from '../models/user.js'
import asyncHandler from '../service/asyncHandler.js';
import CustomError from '../utils/CustomError.js';

export const cookieOptions = {
  expires: new Date(Data.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
}


export const signUp = asyncHandler(async (req, res) => {
  // get data from user
  const { name, email, password } = req.body

  // validation
  if (!name || !email || !password) {
    // res.status(400).json({
    //   success: false,
    //   message: error.message
    // })
    throw new CustomError("Please add all fields", 400)
  }

  // add user data to database

  // check if user already exists
  const existingUser = await User.findOne({ email })

  if (existingUser) {
    throw new CustomError("User already exists", 400)
  }
  const user = await User.create({
    name,
    email,
    password
  })

  const token = user.getJWTtoken()
  // safety
  user.password = undefined

  // store this token in user's cookie
  res.cookie("token", token, cookieOptions)

  // send back a response to user
  res.status(200).json({
    success: true,
    token,
    user,
  })


})