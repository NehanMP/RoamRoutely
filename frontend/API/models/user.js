import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  
  },
  { timestamps: true }
);


const User = mongoose.model('User', userSchema);
// User is the name of the modul and must be capital. added auto in mongodb


export default User;

