(function() {
    var app = angular.module('App', ['ngResource']);

    app.factory("Restaurant", function ($resource) {
        return $resource( "http://localhost:3000/api/restaurants/:_id", null,{
            'update': { method:'PUT'}, 'query':  {method:'GET', isArray:true}
        });
    });

    app.controller('restaurantController', function ($scope, Restaurant) {
        // initialize display report to false
        $scope.diplayReport = false;

        //retrieve all restaurant from the API
        Restaurant.query(function (data) {
            $scope.restaurants = data;
        });

        $scope.refreshRestaurants = function(){
            Restaurant.query(function(data) {
                $scope.restaurants = data;
            });
        };

        $scope.showRestaurant = function (restaurantId) {

            Restaurant.get({ _id: restaurantId }, function(data) {
                $scope.selectedRestaurant = data;
            });

            $scope.displayReport = true;
        };

        $scope.hideReport = function(){
            $scope.displayReport = false;
        };

        $scope.addRestaurant = function(){

            var data = {
                borough:       $scope.newBorough,
                cuisine:       $scope.newCuisine,
                name:          $scope.newName,
                restaurant_id: $scope.newRestaurantID,
                date:          $scope.newDate,
                grade:         $scope.newGrade,
                score:         $scope.newScore,
                building:      $scope.newBuilding,
                street:        $scope.newStreet,
                zipcode:       $scope.newZipCode
            };
            $scope.message = Restaurant.save(data)
        };

        $scope.deleteRestaurant = function(restaurantId){

            $scope.message = Restaurant.delete({ _id: restaurantId });
        };

        $scope.updateRestaurant = function(restaurantId){

            var updateBorough = document.getElementById('updateRestaurantBorough' + restaurantId).innerHTML;
            var updateCuisine = document.getElementById('updateRestaurantCuisine' + restaurantId).innerHTML;
            var updateName = document.getElementById('updateRestaurantName' + restaurantId).innerHTML;

            var restaurant = Restaurant.query({emp_no: empNo}, function(data){

                var data = {
                    borough : updateBorough,
                    cuisine : updateCuisine,
                    name : updateName};

                $scope.message = Restaurant.update({_id: restaurantId}, data);
            });
        };
    });
})();