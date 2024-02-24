import axios from "axios";

// copied from rapidapi and modified as needed
const url =
  "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";



  export const getplacedata = async (sw, ne) => {
    try {
      const response = await axios.get(url,{
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          'X-RapidAPI-Key': '614defb7e8msh31f3df93bb638adp13cd1ejsn365b61f6df15',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        },
      });
      console.log('API Response:', response); // Log the entire response
      return response.data.data; // Return the 'data' property of the response data
    } catch (error) {
      console.error('Error in API call:', error);
    }
  };
  