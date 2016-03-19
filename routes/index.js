var express = require('express');
var router = express.Router();
var restaurantController = require('../controllers/restaurantController');

// middleware to use for all requests
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here
// on routes that end in /restaurants
// ----------------------------------------------------
router.route('/restaurants')

    // create a Restaurant (accessed at POST http://localhost:3000/api/Restaurants)
    .post(restaurantController.store)
    .get(restaurantController.index);



// ----------------------------------------------------
router.route('/restaurants/:_id')

    .get(restaurantController.show)
// update the Restaurant with this id (accessed at PUT http://localhost:8080/api/Restaurants/:Restaurant_id)
    .put(restaurantController.update)
// delete the Restaurant with this id (accessed at DELETE http://localhost:8080/api/Restaurants/:Restaurant_id)
    .delete(restaurantController.destroy);



module.exports = router;