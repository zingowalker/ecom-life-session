import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import config from '../config/index.js';
import crypto from 'crypto';

import AuthRoles from '../utils/authRoles.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      maxLength: [50, 'Name must be less than 50 chars'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email address format',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z]).{8,}$/,
        'Password must be at least 8 characters long, Should contain at least one uppercase letter, one lowercase letter, one number and one special character (e.g. !@#$%^&*()_+-=[]{}).',
      ],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(AuthRoles),
      default: AuthRoles.USER,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  { timestamps: true }
)

// Encrypt the password before saving: Hooks

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods = {
  // compare password
  comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  },
  // generate JWT token
  getJWTtoken: function () {
    JWT.sign({ _id: this._id, role: this.role }, config.JWT_SECRET,
      {
        expiresIn: config.JWT_EXPIRY
      })
  },
  // generate forgot password token
  generateForgotPasswordToken: function () {
    const forgotToken = crypto.randomBytes(20).toString("hex")

    // encrypt the token generated by crypto
    this.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(forgotToken)
      .digest("hex")

    // time for token to expire
    this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000
    
    return this.forgotToken
  }
}

export default mongoose.model('User', userSchema)
