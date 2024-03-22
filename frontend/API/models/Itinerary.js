import mongoose from 'mongoose';

const userInputSchema = new mongoose.Schema(
  {
 
    userLocation: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    estimatedBudget: {
      type: Number,
      required: true,
    },
    TypeofTrip: {
      type: String,
      required: true,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    travelingCount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const UserInput = mongoose.model('UserInput', userInputSchema);

export default UserInput;

