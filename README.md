# Total Steam Price
View the total price of all products on the [Steam](https://store.steampowered.com) store page. This is an extension of a previous project. In this I intend to include a lot more features, such as filters. See the original work [here](https://beta.magn0053.dk/steam/steamcompare/totalPrice)


# Testing
For testing I'm running everything locally - to test POST requests I'm using [Postman](https://www.postman.com/)

# How to contribute

## Get the code
Fork/Download or Make a pull request to get started.
Testing is run locally, start by making sure you have [Node.JS](https://www.nodejs.org) and [MongoDB](https://www.mongodb.com/) installed - always running latest stable build unless otherwise specified.

Next rename `configuration-example.json` to `configuration.json` and fill in the missing information.

Setup for the local MongoDB will follow soon.

## Install dependencies
```
npm install
```

## Run the code
### For production
```
npm start
```
### For development
```
npm test
```
This will automatically restart the application on code updates, very useful for developement

# Just a practial note
It's my first time really working open-source and using GitHub - any tips and tricks are very welcome!

# License
MIT. Copyright (c) Magnus Vestergaard