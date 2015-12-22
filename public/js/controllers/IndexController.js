app.controller('IndexController', ['$scope', '$http', 'User', '$window', function($scope, $http, User, $window) {

  $scope.isLoggedIn = false;

  $http.get("/loggedin")
  .success(function (data) {
    if (data !== undefined && data != "" ) {
      $scope.user = data;
      $scope.isLoggedIn = true;
      User.isLoggedIn = true;
      User.email = $scope.user;
    }
    else {
      User.isLoggedIn = false;
      User.email = '';
      $scope.isLoggedIn = false;
    }})
    .error(function (err) {
      console.log('Error: ' + err);
    });

console.log(User)


  $scope.logout = function() {
    $http.get("/logout");
    User.isLoggedIn = false;
    User.email = '';
    $scope.isLoggedIn = false;
  }
}]);
