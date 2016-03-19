// app/models/Restaurant.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RestaurantSchema   = new Schema({
    userId: String,
    address: [AddressSchema],
    borough: String,
    cuisine: String,
    name:    String,
    grades: [GradesSchema],
    restaurant_id: String
});

var GradesSchema = new Schema ({
    date: Date,
    grade: String,
    score: Number
});

var CoordSchema = new Schema ({
    x: Number,
    y: Number
});

var AddressSchema = new Schema ({
    building: String,
    coord: [CoordSchema],
    street: String,
    zipcode: String
});



module.exports = mongoose.model('Restaurant', RestaurantSchema);