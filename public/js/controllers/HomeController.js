app.controller('HomeController', ['$scope', '$http', 'User', function($scope, $http, User) {

  $scope.isLoggedIn = User.isLoggedIn;
  console.log(User)

}]);
