from flask import Flask, request
from flask_restful import Resource, Api
from filteration import generate_itinerary

app = Flask(__name__)
api = Api(app)

fakeDatabase = {
    1:{'name':'Clean car'},
    2:{'name':'Write blog'},
    3:{'name':'Start stream'},
}

class Items(Resource):
    def get(self):
        return fakeDatabase

    def post(self):
        data = request.json
        itemId = len(fakeDatabase.keys()) + 1
        fakeDatabase[itemId] = {'name':data['name']}
        return fakeDatabase

class Item(Resource):
    def get(self, pk):
        return fakeDatabase[pk]

class Itinerary(Resource):
    def get(self, id):
        print(id)
        generate_itinerary(id)
        return 'success'

api.add_resource(Items, '/items')
api.add_resource(Itinerary, '/itinerary/<string:id>')

if __name__ == '__main__':
    app.run(debug=True)