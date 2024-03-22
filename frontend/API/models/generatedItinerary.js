
import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
  itineraries: {  // Use "itineraries" for consistency with the collection name
    type: [{
      content: {
        type: String,
        required: true
      }
    }],
    required: true
  }
});

const ItineraryGenerated = mongoose.model('Itinerary', itinerarySchema, 'itineraries');

export default ItineraryGenerated;

