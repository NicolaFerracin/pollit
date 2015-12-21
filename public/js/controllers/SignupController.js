app.controller('SignupController', ['$scope', '$http', function($scope, $http) {

  $scope.submitted = false;

  $scope.showAlert = false;

  $scope.account = {
    email : '',
    password : '',
    repeatPassword : ''
  }

  $scope.signup = function(account) {
    $scope.submitted = true;

    if (account.password != account.repeatPassword) {
      $scope.submitted = false;
      $scope.showAlert = true;
    }

    // submit obj to db
    $http.post('/signup', {username: account.username, password: account.password})
    .success(function(data) {
      console.log("yuhu: " + data);;
    })
    .error(function(data) {
      console.log("Error: " + data);
    });
  }
}]);
