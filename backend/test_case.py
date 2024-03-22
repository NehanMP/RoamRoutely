import unittest
import pandas as pd
from datetime import timedelta
from unittest.mock import patch, MagicMock

from filteration import match_destination_attractions
from filteration import select_Hotel
from filteration import get_Distance
from filteration import store_itinerary_in_mongodb
from filteration import extract_distance
from filteration import sort_locations
from filteration import calculate_total_time
from filteration import select_Restaurant
from filteration import select_Attractions


class TestCalculateTotalTime(unittest.TestCase):

    def test_total_time_zero(self):
        itinerary_list = []
        expected_total_time = timedelta(hours=0)
        result = calculate_total_time(itinerary_list)
        self.assertEqual(result, expected_total_time)

    def test_total_time_single_item(self):
        itinerary_list = [{'duration': '2 hours 30 minutes'}]
        expected_total_time = timedelta(hours=2, minutes=30)
        result = calculate_total_time(itinerary_list)
        self.assertEqual(result, expected_total_time)

    def test_total_time_multiple_items(self):
        itinerary_list = [
            {'duration': '1 hour 30 minutes'},
            {'duration': '3 hours 45 minutes'},
            {'duration': '2 hours 15 minutes'}
        ]
        expected_total_time = timedelta(hours=7, minutes=30)
        result = calculate_total_time(itinerary_list)
        self.assertEqual(result, expected_total_time)

    def test_total_time_empty_duration(self):
        itinerary_list = [{'duration': ''}]
        expected_total_time = timedelta(hours=0)
        result = calculate_total_time(itinerary_list)
        self.assertEqual(result, expected_total_time)

    def test_total_time_no_duration(self):
        itinerary_list = [{'name': 'Colombo Museum'}]
        expected_total_time = timedelta(hours=0)
        result = calculate_total_time(itinerary_list)
        self.assertEqual(result, expected_total_time)


class TestSortLocations(unittest.TestCase):

    def test_sort_locations_empty_input(self):
        locations = []
        expected_sorted_locations = []
        result = sort_locations(locations)
        self.assertEqual(result, expected_sorted_locations)

    def test_sort_locations_single_location(self):
        locations = [{'name': 'Colombo City Center', 'distance': '5.0 km'}]
        expected_sorted_locations = [{'name': 'Colombo City Center', 'distance': '5.0 km'}]
        result = sort_locations(locations)
        self.assertEqual(result, expected_sorted_locations)

    def test_sort_locations_multiple_locations(self):
        locations = [{'name': 'Colombo City Center', 'distance': '5.0 km'}, {'name': 'Galle Face', 'distance': '2.0 km'}, {'name': 'Marino Mall', 'distance': '10.0 km'}]
        expected_sorted_locations = [{'name': 'Galle Face', 'distance': '2.0 km'}, {'name': 'Colombo City Center', 'distance': '5.0 km'}, {'name': 'Marino Mall', 'distance': '10.0 km'}]
        result = sort_locations(locations)
        self.assertEqual(result, expected_sorted_locations)


class TestExtractDistance(unittest.TestCase):

    def test_extract_distance_single_digit(self):
        distance_str = "5.0 km"
        expected_distance = 5.0
        result = extract_distance(distance_str)
        self.assertEqual(result, expected_distance)

    def test_extract_distance_multi_digit(self):
        distance_str = "15.5 km"
        expected_distance = 15.5
        result = extract_distance(distance_str)
        self.assertEqual(result, expected_distance)

    def test_extract_distance_miles(self):
        distance_str = "10.3 miles"
        expected_distance = 10.3
        result = extract_distance(distance_str)
        self.assertEqual(result, expected_distance)

    def test_extract_distance_tuple_input(self):
        distance_str_tuple = ("7.2 km",)
        expected_distance = 7.2
        result = extract_distance(distance_str_tuple)
        self.assertEqual(result, expected_distance)


class TestStoreItineraryInMongoDB(unittest.TestCase):

    @patch('filteration.itinerary_collection')
    def test_store_itinerary_in_mongodb(self, mock_collection):
        itinerary_list = [
            {"content": "Start itinerary"},
            {"content": "Day 1 itinerary"},
            {"content": "Day 2 itinerary"},
            {"content": "End itinerary"}
        ]
        
        # Mock MongoDB collection and insert_one method
        mock_insert_one = MagicMock()
        mock_collection.insert_one = mock_insert_one

        # Call the function
        store_itinerary_in_mongodb(itinerary_list)

        # Assertions
        mock_insert_one.assert_called_once()  
        
        args, kwargs = mock_insert_one.call_args
        inserted_document = args[0]  
        self.assertIn("itineraries", inserted_document)  
        self.assertEqual(inserted_document["itineraries"], itinerary_list)  

    @patch('filteration.itinerary_collection')
    def test_store_itinerary_in_mongodb_empty_list(self, mock_collection):
        itinerary_list = []
        
        # Mock MongoDB collection 
        mock_insert_one = MagicMock()
        mock_collection.insert_one = mock_insert_one

        # Call the function
        store_itinerary_in_mongodb(itinerary_list)

        # Assertions
        mock_insert_one.assert_called_once() 

        args, kwargs = mock_insert_one.call_args
        inserted_document = args[0]  
        self.assertIn("itineraries", inserted_document)  
        self.assertEqual(inserted_document["itineraries"], itinerary_list)  


class TestGetDistance(unittest.TestCase):

    @patch('filteration.gmaps_client.directions')
    def test_valid_directions(self, mock_directions):
        mock_result = [{'legs': [{'distance': {'text': '5.0 km'}, 'duration': {'text': '15 mins'}}]}]
        mock_directions.return_value = mock_result

        user_location = "User Location"
        input_destination = "Destination"
        expected_distance = ('5.0 km', 'away and take an estimated time of', '15 mins')

        result = get_Distance(user_location, input_destination)
        self.assertEqual(result, expected_distance)

    @patch('filteration.gmaps_client.directions')
    def test_directions_not_found(self, mock_directions):
        mock_result = []
        mock_directions.return_value = mock_result

        user_location = "User Location"
        input_destination = "Destination"

        result = get_Distance(user_location, input_destination)
        self.assertEqual(result, "Directions not found")

    @patch('filteration.gmaps_client.directions')
    def test_api_error(self, mock_directions):
        from googlemaps.exceptions import ApiError
        mock_directions.side_effect = ApiError("API Error")

        user_location = "User Location"
        input_destination = "Destination"

        result = get_Distance(user_location, input_destination)
        self.assertEqual(result, "Directions: API Error")


class TestSelectHotel(unittest.TestCase):
    def test_select_hotel_available(self):
        hotels = ['Shangri-La Hotel', 'Cinnamon Grand', 'Hilton Colombo']
        selected_hotels = ['Cinnamon Grand']
        result = select_Hotel(hotels, selected_hotels)
        self.assertIn(result, ['Shangri-La Hotel', 'Hilton Colombo'])

    def test_select_hotel_not_available(self):
        hotels = ['Shangri-La Hotel']
        selected_hotels = ['Shangri-La Hotel']
        result = select_Hotel(hotels, selected_hotels)
        self.assertIsNone(result)

class TestSelectRestaurant(unittest.TestCase):
    def test_select_restaurant_available(self):
        restaurants = ['Ministry of Crab', 'The Gallery Cafe', 'Colombo City Hotel']
        selected_restaurants = ['The Gallery Cafe']
        result = select_Restaurant(restaurants, selected_restaurants)
        self.assertIn(result, ['Ministry of Crab', 'Colombo City Hotel'])

    def test_select_restaurant_not_available(self):
        restaurants = ['Ministry of Crab']
        selected_restaurants = ['Ministry of Crab']
        result = select_Restaurant(restaurants, selected_restaurants)
        self.assertIsNone(result)

class TestSelectAttractions(unittest.TestCase):
    def test_select_attractions_available(self):
        attractions = ['Colombo City Centre', 'One Galle Face Mall', 'Majestic City']
        selected_attractions = ['One Galle Face Mall']
        result = select_Attractions(attractions, selected_attractions)
        self.assertIn(result, ['Colombo City Centre', 'Majestic City'])

    def test_select_attractions_not_available(self):
        attractions = ['Colombo City Centre']
        selected_attractions = ['Colombo City Centre']
        result = select_Attractions(attractions, selected_attractions)
        self.assertIsNone(result)


class TestMatchDestinationAttractions(unittest.TestCase):
    def setUp(self):
        self.destination_data = pd.DataFrame({
            'District': ['New York', 'Paris', 'Tokyo'],
            'Religious_Attractions': [['St. Patrick Cathedral'], ['Notre Dame'], ['Senso-ji Temple']],
            'Cultural_Attractions': [['Metropolitan Museum of Art'], ['Louvre'], ['Tokyo National Museum']],
            'Shopping_Places': [['5th Avenue'], ['Champs-Élysées'], ['Ginza District']],
            'Educational_Places': [['American Museum of Natural History'], ['Musée d\'Orsay'], ['Tokyo University']],
            'Fun_And_Family': [['Central Park'], ['Disneyland Paris'], ['Tokyo Disneyland']]
        })

    def test_religious_attractions(self):
        result = match_destination_attractions('New York', 'Religious', self.destination_data)
        self.assertEqual(result, [['St. Patrick Cathedral']])

    def test_cultural_attractions(self):
        result = match_destination_attractions('Paris', 'Cultural', self.destination_data)
        self.assertEqual(result, [['Louvre']])

    def test_shopping_places(self):
        result = match_destination_attractions('Tokyo', 'Shopping', self.destination_data)
        self.assertEqual(result, [['Ginza District']])

    def test_educational_places(self):
        result = match_destination_attractions('New York', 'Educational', self.destination_data)
        self.assertEqual(result, [['American Museum of Natural History']])

    def test_family_attractions(self):
        result = match_destination_attractions('Paris', 'Family', self.destination_data)
        self.assertEqual(result, [['Disneyland Paris']])

    def test_invalid_vacation_type(self):
        result = match_destination_attractions('Paris', 'Adventure', self.destination_data)
        self.assertIsNone(result)

    def test_no_matching_district(self):
        result = match_destination_attractions('London', 'Cultural', self.destination_data)
        self.assertIsNone(result)



if __name__ == '__main__':
    unittest.main()
