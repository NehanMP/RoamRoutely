import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    // rules for the model
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
//   mongodb adds two other info for each user
);

const User = mongoose.model('User', userSchema);
// User is the name of the modul and must be capital. added auto in mongodb


export default User;