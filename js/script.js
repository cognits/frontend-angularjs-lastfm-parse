Parse.initialize("YJwHjwYF08scjC2SEdl9Ve2YFB3056FQfkUgGu8p", "awDPDR2YNfZNtbJ54VzEZPiWJZmLekU8qkJxnlOw");

var  AuthApp = angular.module('AuthApp', [])
.run(['$rootScope', function($scope) {
  $scope.scenario = 'Sign up';
  $scope.currentUser = Parse.User.current();
  
  $scope.signUp = function(form) {
    var user = new Parse.User();
    user.set("email", form.email);
    user.set("username", form.username);
    user.set("password", form.password);
    
    user.signUp(null, {
      success: function(user) {
        $scope.currentUser = user;
        $scope.$apply();
      },
      error: function(user, error) {
        alert("Unable to sign up:  " + error.code + " " + error.message);
      }
    });    
  };
  
  $scope.logIn = function(form) {
    Parse.User.logIn(form.username, form.password, {
      success: function(user) {
        $scope.currentUser = user;
        $scope.$apply();
      },
      error: function(user, error) {
        alert("Unable to log in: " + error.code + " " + error.message);
      }
    });
  };
  
  $scope.logOut = function(form) {
    Parse.User.logOut();
    $scope.currentUser = null;
  };
}]);

AuthApp.filter("pictureSong", function(){
  return function(item){
    return (JSON.stringify(item)).slice(10,-18);
  };
});
AuthApp.controller('SearchController', function ($scope, $http) {
  $http.get('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=85b8c37b1a6be5182a5ed0549c4a7400&format=json').success(function(data) {
    $scope.phones = data.tracks.track;
  });
  $scope.orderBy = function(orden){
    $scope.orderSelect = orden;
  };
	
$scope.filterTypes = [
	{name: "Global", search: "buscar"},
	{name: "Artista", search: "buscar.artist.name"},
	{name: "Canción", search: "buscar.name"},
	{name: "Duración", search: "buscar.duration"}
	];
	$scope.selectedFilter = $scope.filterTypes[0];
});