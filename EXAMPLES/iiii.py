# -*- coding: utf-8 -*-
"""RoamRoutely.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1G-wpbN2CMIygIuFpVTVD2iIPVhY5NXh6
"""

!pip install fuzzywuzzy

# Import necessary libraries
import numpy as np
import pandas as pd
from fuzzywuzzy import fuzz

destination = pd.read_csv('/content/dataset.csv')

def match_destination_hotel(input_destination, budget, days, people_count, destination_data):
    hotel_budget = budget / 3
    PD_Value = people_count * days
    final_hotel_price = hotel_budget / PD_Value

    print("Hotel Budget:", hotel_budget)
    print("PD Value:", PD_Value)
    print("Final Hotel Price:", final_hotel_price)
    print()

    # Exact string matching for destination
    exact_destination_matches = destination_data[destination_data['District'].fillna('').str.lower() == input_destination.lower()]

    # Filter destinations by budget range
    if not exact_destination_matches.empty:
        budget_matches = exact_destination_matches[
            (exact_destination_matches['Hotel_Budget'] >= int(final_hotel_price) - 100) &
            (exact_destination_matches['Hotel_Budget'] <= int(final_hotel_price) + 10)
        ]
        if not budget_matches.empty:
            return budget_matches.to_dict('records')

    # Fuzzy string matching for destination
    fuzzy_matches = [(index, district, fuzz.partial_ratio(input_destination.lower(), str(district).lower())) for index, district in enumerate(destination_data['District'])]
    fuzzy_matches = sorted(fuzzy_matches, key=lambda x: x[2], reverse=True)

    best_match_index, best_match_destination, score = fuzzy_matches[0]
    if score > 75:  # Threshold for fuzzy matching
        best_match_budget = destination_data.iloc[best_match_index]['Hotel_Budget']
        if abs(int(final_hotel_price) - best_match_budget) <= 20:
            return [destination_data.iloc[best_match_index].to_dict()]

    return None  # No match found


def match_destination_restaurants(input_destination, budget, days, people_count, destination_data):
    restaurant_budget = budget / 3
    meal_budget = restaurant_budget / 2

    PD_Value = people_count * days
    final_res_price = meal_budget / PD_Value

    print("Restaurant Budget:", restaurant_budget)
    print("Meal Budget:", meal_budget)
    print("PD Value:", PD_Value)
    print("Final Restaurant Price:", final_res_price)
    print()

    # Exact string matching for destination
    exact_destination_matches = destination_data[destination_data['District'].fillna('').str.lower() == input_destination.lower()]

    # Filter destinations by budget range
    if not exact_destination_matches.empty:
        budget_matches = exact_destination_matches[
            (exact_destination_matches['Restaurant_Budget'] >= int(final_res_price) - 100) &
            (exact_destination_matches['Restaurant_Budget'] <= int(final_res_price) + 10)
        ]
        if not budget_matches.empty:
            return budget_matches.to_dict('records')

    # Fuzzy string matching for destination
    fuzzy_matches = [(index, district, fuzz.partial_ratio(input_destination.lower(), str(district).lower())) for index, district in enumerate(destination_data['District'])]
    fuzzy_matches = sorted(fuzzy_matches, key=lambda x: x[2], reverse=True)

    best_match_index, best_match_destination, score = fuzzy_matches[0]
    if score > 75:  # Threshold for fuzzy matching
        best_match_budget = destination_data.iloc[best_match_index]['Restaurant_Budget']
        if abs(int(final_res_price) - best_match_budget) <= 20:
            return [destination_data.iloc[best_match_index].to_dict()]

    return None  # No match found


def match_destination_attractions(input_destination, vacation_type, destination_data):
    exact_destination_matches = destination_data[destination_data['District'].fillna('').str.lower() == input_destination.lower()]

    if not exact_destination_matches.empty:
        if vacation_type.lower() == 'religious':
            religious_attractions = exact_destination_matches['Religious_Attractions'].tolist()
            return religious_attractions

        elif vacation_type.lower() == 'cultural':
            cultural_attractions = exact_destination_matches['Cultural_Attractions'].tolist()
            return cultural_attractions

        elif vacation_type.lower() == 'shopping':
            shopping_places = exact_destination_matches['Shopping_Places'].tolist()
            return shopping_places

        elif vacation_type.lower() == 'education':
            educational_places = exact_destination_matches['Educational_Places'].tolist()
            return educational_places

        elif vacation_type.lower() == 'family':
            fun_and_family = exact_destination_matches['Fun_And_Family'].tolist()
            return fun_and_family

        else:
            print("Invalid input for the vacation type.")
            return None
    else:
        print("No matching district found.")
        return None


#Trip_Start_Itinerary = ["Travel from your location", user_location, " to the hotel", hotel, "which is ", distance, " away that'll take an estimated time of", time, "."]

#Itinerary1 = ["Have breakfast at the hotel ", hotel, ". Go to the first atraction location of the trip: ", attraction1, ". Distance from the hotel to the place is ", distance1,
 #             ", which will take an estimated time of ", time1, ". Go to the restaurant: ", restaurant1, "to have lunch which is ", distance2, "away from", attraction1,
  #            "place with an estimated arrival time of ", time2, ". Next go the attraction site ", attraction2, "Which is ", distance3, "away from the the restaurant.",
   #           "For dinner, go to the restaurant", restaurant2, "Which is ", distance3, " away from the attraction place which will take an estimated time of", time3,
    #          " Finally go back to the hotel which will take an estimated time of", time4, " located", distance4, " away."]


# Trip_End_Itinerary = ["Travel from the hotel ", hotel, " back to your residence ", user_location, ", which is ", distance, " away that'll take an estimated time of", time, "."]

#Itinerary2 = ["Start the day with breakfast at the hotel ", hotel, ". Head to the first destination of the day: ", destination1, ". It's located ", distance1,
 #             " away from the hotel, and it'll take approximately ", time1, " to get there. Proceed to the recommended lunch spot, ", restaurant1, " which is ",
  #            distance2, " away from ", destination1, " with an estimated travel time of ", time2, ". Next, visit the popular landmark ", landmark1, " located ",
   #           distance3, " from the restaurant. For dinner, dine at ", restaurant2, ", situated ", distance4, " away from ", landmark1, " with an estimated travel time of ",
    #          time3, ". Finally, return to the hotel for the night, which is ", distance5, " away from ", restaurant2, " and will take approximately ", time4, "."]

#Trip_End_Itinerary2 = ["Travel from the hotel ", hotel, " back to your home ", home_location, ", which is ", distance6, " away. The estimated travel time is ", time5, "."]

#Itinerary2 = ["Start the day with a delicious breakfast at ", hotel, " before heading to the first attraction: ", attraction1, ". The distance from the hotel is ", distance1,
 #             ", and it should take about ", time1, " to get there. Enjoy lunch at ", restaurant1, ", which is located ", distance2, " away from ", attraction1,
  #            ", with an estimated arrival time of ", time2, ". Next, explore ", attraction2, ", which is ", distance3, " from the restaurant.",
   #           " Conclude the day with dinner at ", restaurant2, ", situated ", distance3, " away from the previous attraction, with an estimated travel time of ", time3,
    #          ". Finally, return to the hotel, approximately ", distance4, " away, which will take about ", time4, " to reach."] 

#Itinerary3 = ["Begin your day with breakfast at ", hotel, " before heading to the first attraction: ", attraction1, ". The distance from the hotel is ", distance1,
 #             ", and it should take about ", time1, " to reach there. Enjoy lunch at ", restaurant1, ", which is located ", distance2, " away from ", attraction1,
  #            ", with an estimated arrival time of ", time2, ". Next, visit ", attraction2, ", which is ", distance3, " from the restaurant.",
   #           " Conclude the day with dinner at ", restaurant2, ", situated ", distance3, " away from the previous attraction, with an estimated travel time of ", time3,
    #          ". Finally, return to the hotel, approximately ", distance4, " away, which will take about ", time4, " to reach."] 

#Itinerary4 = ["Start your day with a hearty breakfast at ", hotel, " before heading to the first attraction: ", attraction1, ". The distance from the hotel is ", distance1,
 #             ", and it should take about ", time1, " to get there. Enjoy lunch at ", restaurant1, ", which is located ", distance2, " away from ", attraction1,
  #            ", with an estimated arrival time of ", time2, ". Next, explore ", attraction2, ", which is ", distance3, " from the restaurant.",
   #           " Conclude the day with dinner at ", restaurant2, ", situated ", distance3, " away from the previous attraction, with an estimated travel time of ", time3,
    #          ". Finally, return to the hotel, approximately ", distance4, " away, which will take about ", time4, " to reach."] 

#Itinerary5 = ["Begin your day with breakfast at ", hotel, " before heading to the first attraction: ", attraction1, ". The distance from the hotel is ", distance1,
 #             ", and it should take about ", time1, " to reach there. Enjoy lunch at ", restaurant1, ", which is located ", distance2, " away from ", attraction1,
  #            ", with an estimated arrival time of ", time2, ". Next, visit ", attraction2, ", which is ", distance3, " from the restaurant.",
   #           " Conclude the day with dinner at ", restaurant2, ", situated ", distance3, " away from the previous attraction, with an estimated travel time of ", time3,
    #          ". Finally, return to the hotel, approximately ", distance4, " away, which will take about ", time4, " to reach."]




hotels = []
restaurants = []
attractions = []

input_destination = input("Enter the location (District): ").strip()
budget = int(input("Enter budget ($): "))
days = int(input("Enter number of days: "))
people_count = int(input("Enter the number of people traveling: "))
vacation_type = input("Enter type of vacation: ").strip()
print()

# Perform matching
matched_hotel_destinations = match_destination_hotel(input_destination, budget, days, people_count, destination)
matched_restaurant_destinations = match_destination_restaurants(input_destination, budget, days, people_count, destination)
matched_destination_attractions = match_destination_attractions(input_destination, vacation_type, destination)

# Output results
if matched_hotel_destinations:
    print("Hotels found in given location", input_destination + ":", len(matched_hotel_destinations))
    for matched_dest in matched_hotel_destinations:
      hotels.append(matched_dest["Hotels"])
else:
    print("No hotels found for the given location and budget.")


if matched_restaurant_destinations:
    print("Restaurants found in given location", input_destination + ":", len(matched_restaurant_destinations))
    for matched_dest in matched_restaurant_destinations:
        restaurants.append(matched_dest["Restaurants"])
else:
    print("No restaurants found for the given location and budget.")


if matched_destination_attractions:
    attractions.extend(matched_destination_attractions)
    print("Attractions found in given location", input_destination + ":", len(attractions))
else:
    print("No attractions found in the given location")


print()
print("Hotels =", hotels)
print()
print("Restaurants =", restaurants)
print()
print("Attractions =", attractions)

