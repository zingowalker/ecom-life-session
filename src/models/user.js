import mongoose from "mongoose";
import AuthRoles from '../utils/authRoles.js';


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxLength: [50, "Name must be less than 50 chars"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
        'Invalid email address format'],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z]).{8,}$/,
      "Password must be at least 8 characters long, Should contain at least one uppercase letter, one lowercase letter, one number and one special character (e.g. !@#$%^&*()_+-=[]{})."
      ],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(AuthRoles),
      default: AuthRoles.USER,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date
  }, {timeStamps: true}
)




export default mongoose.model("User", "userSchema");